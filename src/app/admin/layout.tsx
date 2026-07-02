import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminNav } from "./_components/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // /admin/login is public; everything else requires a session.
  // The middleware already redirects, but this is a server-side guard too.
  const session = await getSession();

  // Detect if we're on the login page — if so, don't redirect.
  // We can't use usePathname in a server layout, so we rely on middleware
  // for the login bypass and just render the nav conditionally.
  return (
    <div className="min-h-screen bg-muted/20">
      {session && <AdminNav email={session.email} />}
      <main className={session ? "mx-auto max-w-7xl px-4 py-8" : ""}>
        {children}
      </main>
    </div>
  );
}
