import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "info@hubss.com";

interface ContactPayload {
  formType: "contact" | "lunch-learn" | "newsletter";
  name?: string;
  email?: string;
  company?: string;
  city?: string;
  phone?: string;
  projectType?: string;
  message?: string;
  website?: string; // honeypot
}

function buildEmailHtml(data: ContactPayload): string {
  const rows = [
    data.name && `<tr><td><strong>Name</strong></td><td>${data.name}</td></tr>`,
    data.email && `<tr><td><strong>Email</strong></td><td>${data.email}</td></tr>`,
    data.company && `<tr><td><strong>Company</strong></td><td>${data.company}</td></tr>`,
    data.city && `<tr><td><strong>City</strong></td><td>${data.city}</td></tr>`,
    data.phone && `<tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>`,
    data.projectType && `<tr><td><strong>Project Type</strong></td><td>${data.projectType}</td></tr>`,
    data.message && `<tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${data.message}</td></tr>`,
  ]
    .filter(Boolean)
    .join("\n");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <div style="background:#f97316;height:4px;margin-bottom:24px;border-radius:2px"></div>
      <h2 style="margin:0 0 16px;color:#1a1a1a">
        ${
          data.formType === "lunch-learn"
            ? "New Lunch & Learn Request"
            : data.formType === "newsletter"
            ? "Newsletter Signup"
            : "New Contact Form Submission"
        }
      </h2>
      <table style="width:100%;border-collapse:collapse">
        <tbody style="font-size:14px;line-height:1.8;color:#333">
          ${rows}
        </tbody>
      </table>
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee">
      <p style="font-size:12px;color:#999;margin:0">
        Submitted via hubss.com &nbsp;·&nbsp; ${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })} ET
      </p>
    </div>
  `;
}

function buildSubjectLine(data: ContactPayload): string {
  if (data.formType === "lunch-learn") {
    return `Lunch & Learn Request — ${data.name ?? "Unknown"} @ ${data.company ?? "Unknown"}`;
  }
  if (data.formType === "newsletter") {
    return `Newsletter Signup — ${data.email}`;
  }
  return `Contact Form — ${data.name ?? "Unknown"} @ ${data.company ?? "Unknown"}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    // Honeypot: if the hidden "website" field is filled, silently succeed
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // Basic validation
    if (!body.email || !body.formType) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      // Dev fallback: log to console when no key is configured
      console.log("[contact API] No RESEND_API_KEY — would send:", body);
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "HUB Surface Systems <noreply@hubss.com>",
      to: [TO_EMAIL],
      replyTo: body.email,
      subject: buildSubjectLine(body),
      html: buildEmailHtml(body),
    });

    if (error) {
      console.error("[contact API] Resend error:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact API] Unexpected error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
