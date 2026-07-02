import { Resend } from "resend";
import { SITE, absoluteUrl } from "@/lib/site-config";

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
 * Sends an auto-reply confirmation email to the lead letting them know
 * their inquiry was received and the team will follow up shortly.
 * Returns "skipped" when RESEND_API_KEY isn't configured.
 */
export async function sendLeadAutoReply(input: LeadEmailInput): Promise<"sent" | "failed" | "skipped"> {
  if (!resend) {
    console.info(`[email] RESEND_API_KEY not set — skipping auto-reply to ${input.email}.`);
    return "skipped";
  }

  const firstName = input.name?.split(" ")[0] ?? "there";
  const siteUrl = SITE.url;

  try {
    await resend.emails.send({
      from: FROM,
      to: input.email,
      replyTo: SITE.email,
      subject: `We received your inquiry — ${SITE.shortName}`,
      html: `
        <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#1a1a1a;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden">
          <!-- Header band -->
          <div style="background:linear-gradient(135deg,#b2541a 0%,#dc6b2f 100%);padding:24px 32px;text-align:center">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.3px">${SITE.shortName}</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-style:italic">${SITE.tagline}</p>
          </div>

          <!-- Body -->
          <div style="padding:32px">
            <h2 style="margin:0 0 16px;font-size:19px;color:#1a1a1a">Hi ${firstName},</h2>
            <p style="margin:0 0 16px;line-height:1.6;color:#444">
              Thank you for reaching out to ${SITE.name}! We've received your inquiry
              and wanted to confirm that your message is in good hands.
            </p>
            <p style="margin:0 0 16px;line-height:1.6;color:#444">
              Our team reviews every submission personally, and we'll get back to you
              within <strong>one business day</strong> to discuss your project and schedule
              a free consultation at your convenience.
            </p>

            <!-- Quick highlights -->
            <div style="background:#faf6f0;border-left:4px solid #dc6b2f;border-radius:4px;padding:16px 20px;margin:24px 0">
              <p style="margin:0 0 8px;font-weight:600;color:#b2541a;font-size:14px">What happens next?</p>
              <ul style="margin:0;padding-left:18px;color:#555;line-height:1.7;font-size:14px">
                <li>We'll review your project details and prepare questions.</li>
                <li>You'll get a call or email from our team within 1 business day.</li>
                <li>We'll schedule a free on-site consultation and estimate.</li>
              </ul>
            </div>

            <!-- Contact info -->
            <div style="margin:24px 0;padding:20px 0;border-top:1px solid #eee;border-bottom:1px solid #eee">
              <p style="margin:0 0 8px;font-weight:600;color:#1a1a1a;font-size:14px">Need to reach us sooner?</p>
              <p style="margin:0;line-height:1.8;color:#555;font-size:14px">
                <strong>Phone:</strong> <a href="${SITE.phoneHref}" style="color:#b2541a;text-decoration:none">${SITE.phone}</a><br>
                <strong>Email:</strong> <a href="${SITE.emailHref}" style="color:#b2541a;text-decoration:none">${SITE.email}</a><br>
                <strong>Hours:</strong> Mon–Fri, 7:00 AM – 5:00 PM PT
              </p>
            </div>

            <p style="margin:0;line-height:1.6;color:#666;font-size:13px">
              We look forward to building something great together.
            </p>
            <p style="margin:16px 0 0;color:#444;font-size:14px">
              Best regards,<br>
              <strong>${SITE.founder}</strong> &amp; the ${SITE.shortName} team<br>
              <span style="color:#888;font-size:12px">${SITE.license} · Serving the ${SITE.region} since ${SITE.since}</span>
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f8f8f8;padding:16px 32px;text-align:center">
            <p style="margin:0;color:#999;font-size:11px;line-height:1.5">
              This email was sent automatically because you submitted a quote request
              at <a href="${siteUrl}" style="color:#999;text-decoration:underline">${siteUrl}</a>.<br>
              You don't need to reply — we'll be in touch soon.
            </p>
          </div>
        </div>
      `,
    });
    return "sent";
  } catch (err) {
    console.error("[email] Failed to send lead auto-reply", err);
    return "failed";
  }
}

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

/**
 * Sends a double opt-in confirmation email to a newsletter subscriber.
 * Returns "skipped" when RESEND_API_KEY isn't configured — the subscriber
 * is still persisted with a token and can confirm later once email is wired.
 */
export async function sendNewsletterConfirmationEmail(
  email: string,
  token: string,
): Promise<"sent" | "failed" | "skipped"> {
  if (!resend) {
    console.info(`[email] RESEND_API_KEY not set — skipping confirmation email to ${email}.`);
    return "skipped";
  }

  const confirmUrl = absoluteUrl(`/api/newsletter/confirm?token=${token}`);

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Confirm your subscription to ${SITE.shortName}`,
      html: `
        <div style="font-family:sans-serif;font-size:14px;color:#222;max-width:560px;margin:0 auto">
          <h2 style="margin:0 0 16px">Confirm your subscription</h2>
          <p>Thanks for subscribing to the ${SITE.name} newsletter!</p>
          <p>Please confirm your email address by clicking the button below:</p>
          <p style="margin:24px 0">
            <a href="${confirmUrl}"
               style="display:inline-block;background:#dc2626;color:#fff;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none">
              Confirm my subscription
            </a>
          </p>
          <p style="color:#6b6b6b;font-size:12px">
            If you didn't subscribe, you can safely ignore this email.
            <br>Or paste this link into your browser: ${confirmUrl}
          </p>
        </div>
      `,
    });
    return "sent";
  } catch (err) {
    console.error("[email] Failed to send newsletter confirmation", err);
    return "failed";
  }
}
