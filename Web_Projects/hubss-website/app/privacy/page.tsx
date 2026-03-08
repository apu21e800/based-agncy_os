import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | HUB Surface Systems",
  description: "HUB Surface Systems privacy policy — how we collect, use, and protect your personal information under PIPEDA.",
};

const sections = [
  {
    heading: "1. Information We Collect",
    body: `When you use hubss.com or submit an inquiry, we may collect the following personal information:

— Contact details: name, email address, phone number, company name, and job title
— Project information: location, project type, and details you provide in form submissions
— Usage data: pages visited, time on site, browser type, and referring URL (collected via cookies and analytics tools)
— Communications: records of email correspondence or form submissions

We collect this information only when you voluntarily provide it, or when it is automatically collected through your use of the site.`,
  },
  {
    heading: "2. How We Use Your Information",
    body: `We use collected information to:

— Respond to your inquiries and project requests
— Send requested product information, spec sheets, or follow-up materials
— Schedule and confirm Lunch & Learn sessions
— Improve our website and service offerings
— Send relevant updates or product announcements (only with your consent)
— Comply with legal obligations

We do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    heading: "3. Legal Basis (PIPEDA)",
    body: `HUB Surface Systems is a Canadian company subject to the Personal Information Protection and Electronic Documents Act (PIPEDA). We collect, use, and disclose personal information with your consent — either express (you fill out a form) or implied (you provide a business card at a trade show).

You may withdraw consent at any time by contacting us at the addresses below, subject to legal or contractual restrictions.`,
  },
  {
    heading: "4. Third-Party Services",
    body: `We use the following third-party services that may process your data:

— Email delivery: Resend (email transmission for form submissions)
— Analytics: Google Analytics (anonymized usage data; IP anonymization enabled)
— Hosting: Vercel (site hosting; data processed in North America)

Each service operates under its own privacy policy. We choose partners who maintain data protection standards consistent with PIPEDA.`,
  },
  {
    heading: "5. Cookies",
    body: `hubss.com uses cookies to:

— Remember your preferences and session state
— Collect anonymized analytics data
— Improve site performance

You can disable cookies in your browser settings. Disabling cookies may affect some site functionality. We do not use cookies for advertising or cross-site tracking.`,
  },
  {
    heading: "6. Data Retention",
    body: `We retain personal information for as long as necessary to fulfill the purposes described in this policy, or as required by law. Inquiry records are typically retained for 3 years from the date of last contact. You may request deletion of your data at any time.`,
  },
  {
    heading: "7. Your Rights",
    body: `Under PIPEDA, you have the right to:

— Access the personal information we hold about you
— Correct inaccurate or incomplete information
— Withdraw consent to our use of your information
— Request deletion of your personal information
— File a complaint with the Office of the Privacy Commissioner of Canada

To exercise any of these rights, contact us using the information below.`,
  },
  {
    heading: "8. Contact Us",
    body: `For privacy-related inquiries, contact:

HUB Surface Systems

East Office — Milton, Ontario
doug.bain@hubss.com | 416-540-9287

West Office — Ladysmith, British Columbia
cleve.stordy@hubss.com | 604-309-8212`,
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#f97316" }}>
          Legal
        </p>
        <h1 className="text-5xl font-bold mb-3 leading-tight" style={{ color: "#f5f0eb" }}>
          Privacy Policy
        </h1>
        <p className="text-sm mb-12" style={{ color: "#9ca3af" }}>
          Last updated: March 2026
        </p>

        <p className="text-base leading-relaxed mb-12" style={{ color: "#9ca3af" }}>
          HUB Surface Systems (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy.
          This policy explains how we collect, use, and safeguard your personal information when
          you visit hubss.com or contact us about our products and services.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.heading} style={{ borderTop: "1px solid #333", paddingTop: "32px" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#f5f0eb" }}>
                {section.heading}
              </h2>
              <div
                className="text-sm leading-relaxed space-y-3 whitespace-pre-line"
                style={{ color: "#9ca3af" }}
              >
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
