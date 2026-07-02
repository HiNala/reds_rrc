// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";

// server-only throws in test environments — stub it out.
vi.mock("server-only", () => ({}));

// Mock next/headers cookies before importing auth.
const cookieStore = new Map<string, string>();

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (key: string) => (cookieStore.has(key) ? { value: cookieStore.get(key) } : undefined),
    set: (key: string, value: string) => void cookieStore.set(key, value),
    delete: (key: string) => void cookieStore.delete(key),
  })),
}));

// Import after mocks are set up.
const { createSession, getSession, destroySession, validateAdminCredentials, verifyToken } =
  await import("@/lib/auth");

describe("auth (jose stateless sessions)", () => {
  beforeEach(() => {
    cookieStore.clear();
    process.env.AUTH_SECRET = "test-secret-key-for-vitest-only-32chars!!";
    process.env.ADMIN_EMAIL = "admin@redsrrc.com";
    process.env.ADMIN_PASSWORD = "supersecret";
  });

  it("creates and verifies a session", async () => {
    const token = await createSession("admin@redsrrc.com");
    expect(token).toBeTruthy();

    const session = await getSession();
    expect(session).not.toBeNull();
    expect(session?.email).toBe("admin@redsrrc.com");
    expect(session?.role).toBe("admin");
  });

  it("returns null when no session cookie", async () => {
    cookieStore.clear();
    const session = await getSession();
    expect(session).toBeNull();
  });

  it("destroys the session", async () => {
    await createSession("admin@redsrrc.com");
    expect(await getSession()).not.toBeNull();
    await destroySession();
    expect(await getSession()).toBeNull();
  });

  it("validates correct admin credentials", () => {
    expect(validateAdminCredentials("admin@redsrrc.com", "supersecret")).toBe(true);
  });

  it("rejects wrong password", () => {
    expect(validateAdminCredentials("admin@redsrrc.com", "wrong")).toBe(false);
  });

  it("rejects wrong email", () => {
    expect(validateAdminCredentials("other@redsrrc.com", "supersecret")).toBe(false);
  });

  it("verifies a token directly", async () => {
    const token = await createSession("admin@redsrrc.com");
    const payload = await verifyToken(token);
    expect(payload?.email).toBe("admin@redsrrc.com");
  });

  it("rejects a tampered token", async () => {
    const payload = await verifyToken("invalid.token.here");
    expect(payload).toBeNull();
  });
});
