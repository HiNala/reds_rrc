import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const ALG = "HS256";

function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ??
    // Dev fallback — never use in production. Logged once.
    "dev-only-insecure-secret-please-set-AUTH_SECRET";
  if (!process.env.AUTH_SECRET && process.env.NODE_ENV !== "test") {
    console.warn("[auth] AUTH_SECRET not set — using insecure dev fallback");
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  email: string;
  role: "admin";
  /** Expiry (ms epoch) */
  exp: number;
}

/**
 * Create a signed session JWT and set it as an httpOnly cookie.
 * Returns the token so callers (e.g. the login route) can redirect.
 */
export async function createSession(email: string): Promise<string> {
  const expiresIn = 60 * 60 * 24 * 7; // 7 days
  const exp = Date.now() + expiresIn * 1000;
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${expiresIn}s`)
    .sign(getSecret());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn,
  });
  return token;
}

/** Destroy the session cookie. */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Read + verify the session from the cookie store. Returns null if absent/invalid. */
export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
    return {
      email: payload.email as string,
      role: payload.role as "admin",
      exp: payload.exp ? (payload.exp as number) * 1000 : 0,
    };
  } catch {
    return null;
  }
}

/** Verify a raw token string (used by middleware). */
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
    return {
      email: payload.email as string,
      role: payload.role as "admin",
      exp: payload.exp ? (payload.exp as number) * 1000 : 0,
    };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;

/**
 * Validate admin credentials against env vars.
 * Single-admin model: ADMIN_EMAIL + ADMIN_PASSWORD.
 */
export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    console.error("[auth] ADMIN_EMAIL / ADMIN_PASSWORD not configured");
    return false;
  }
  // Constant-time-ish comparison to avoid timing attacks.
  return safeEqual(email, adminEmail) && safeEqual(password, adminPassword);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Require an authenticated admin session — throws/redirects for use in server components. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
