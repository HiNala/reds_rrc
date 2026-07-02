import { NextResponse, type NextRequest } from "next/server";
import { loginSchema } from "@/lib/validators";
import { createSession, validateAdminCredentials } from "@/lib/auth";
import { track } from "@/lib/analytics-server";

/**
 * POST /api/admin/login — env-based admin credentials login.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { email, password } = parsed.data;

  if (!validateAdminCredentials(email, password)) {
    await track("login_failed", { props: { method: "credentials", role: "admin" } });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createSession(email);
  await track("login", { props: { method: "credentials", role: "admin" } });

  return NextResponse.json({ ok: true });
}
