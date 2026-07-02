import { Resend } from "resend";
import { SITE } from "@/lib/site-config";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.RESEND_FROM_EMAIL || `${SITE.name} <notifications@redsrrc.com>`;
const NOTIFY_TO = process.env.LEADS_NOTIFICATION_EMAIL || SITE.email;

type LeadEmailInput = {
  kind: "contact" | "quote" | "newsletter";
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  extra?: Record<string, string | undefined>;
};

/**
 * Sends the internal lead-notification email via Resend.
 * Returns "skipped" (not an error) when RESEND_API_KEY isn't configured yet —
 * the lead is still persisted to Postgres by the caller either way.
 */
export async function sendLeadNotification(input: LeadEmailInput): Promise<"sent" | "failed" | "skipped"> {
  if (!resend) {
    console.info(`[email] RESEND_API_KEY not set — skipping notification for ${input.kind} lead (${input.email}).`);
    return "skipped";
  }

  const extraRows = Object.entries(input.extra ?? {})
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">${k}</td><td>${v}</td></tr>`)
    .join("");

  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: input.email,
      subject: `New ${input.kind} lead — ${input.name ?? input.email}`,
      html: `
        <div style="font-family:sans-serif;font-size:14px;color:#222">
          <h2 style="margin:0 0 12px">New ${input.kind} submission</h2>
          <table cellpadding="0" cellspacing="0">
            ${input.name ? `<tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Name</td><td>${input.name}</td></tr>` : ""}
            <tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Email</td><td>${input.email}</td></tr>
            ${input.phone ? `<tr><td style="padding:4px 12px 4px 0;color:#6b6b6b">Phone</td><td>${input.phone}</td></tr>` : ""}
            ${extraRows}
          </table>
          ${input.message ? `<p style="margin-top:16px;white-space:pre-wrap">${input.message}</p>` : ""}
        </div>
      `,
    });
    return "sent";
  } catch (err) {
    console.error("[email] Failed to send lead notification", err);
    return "failed";
  }
}
