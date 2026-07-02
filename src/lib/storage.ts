import "server-only";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";

/**
 * S3-compatible object storage (MinIO in dev/prod).
 *
 * Env vars:
 *  S3_ENDPOINT     – internal endpoint for the S3 client (e.g. http://minio:9000)
 *  S3_PUBLIC_URL   – public base URL for image <img src> (e.g. http://localhost:9000)
 *  S3_ACCESS_KEY   – access key (default: minioadmin)
 *  S3_SECRET_KEY   – secret key (default: minioadmin)
 *  S3_BUCKET       – bucket name (default: redsrrc-projects)
 *  S3_REGION       – region (default: us-east-1)
 */

const ENDPOINT = process.env.S3_ENDPOINT ?? "http://localhost:9000";
const PUBLIC_URL = (process.env.S3_PUBLIC_URL ?? ENDPOINT).replace(/\/$/, "");
const ACCESS_KEY = process.env.S3_ACCESS_KEY ?? "minioadmin";
const SECRET_KEY = process.env.S3_SECRET_KEY ?? "minioadmin";
const BUCKET = process.env.S3_BUCKET ?? "redsrrc-projects";
const REGION = process.env.S3_REGION ?? "us-east-1";

export const s3 = new S3Client({
  endpoint: ENDPOINT,
  region: REGION,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  forcePathStyle: true,
});

let bucketReady = false;

/** Ensure the bucket exists. Called lazily on first upload. */
async function ensureBucket(): Promise<void> {
  if (bucketReady) return;
  try {
    await s3.send(new HeadBucketCommand({ Bucket: BUCKET }));
    bucketReady = true;
  } catch {
    try {
      await s3.send(
        new CreateBucketCommand({ Bucket: BUCKET })
      );
      bucketReady = true;
    } catch (err) {
      console.error("[storage] Failed to create bucket", BUCKET, err);
      throw err;
    }
  }
}

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

export interface UploadResult {
  /** Storage key (path within the bucket), stored in the DB. */
  key: string;
  /** Full public URL for <img src>. */
  url: string;
  /** MIME type. */
  contentType: string;
  /** File size in bytes. */
  size: number;
}

/**
 * Upload an image file to MinIO and return its key + public URL.
 * @param file – the File/Blob from a multipart upload
 * @param projectId – used to namespace keys per project
 */
export async function uploadProjectImage(
  file: File,
  projectId: number
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${file.size} bytes (max ${MAX_FILE_SIZE})`);
  }

  await ensureBucket();

  const ext = path.extname(file.name) || `.${file.type.split("/")[1] ?? "jpg"}`;
  const key = `projects/${projectId}/${randomUUID()}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return {
    key,
    url: `${PUBLIC_URL}/${BUCKET}/${key}`,
    contentType: file.type,
    size: file.size,
  };
}

/** Delete an object from MinIO by its storage key. */
export async function deleteObject(key: string): Promise<void> {
  try {
    await s3.send(
      new DeleteObjectCommand({ Bucket: BUCKET, Key: key })
    );
  } catch (err) {
    console.error("[storage] Failed to delete object", key, err);
  }
}

/** Construct the public URL for a stored key (used when reading from DB). */
export function getPublicUrl(key: string): string {
  return `${PUBLIC_URL}/${BUCKET}/${key}`;
}

export { BUCKET as S3_BUCKET_NAME };
