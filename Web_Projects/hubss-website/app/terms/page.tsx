import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | HUB Surface Systems",
  description: "Terms of use for hubss.com — governing law, intellectual property, and disclaimer of warranties.",
};

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: `By accessing or using hubss.com (the "Site"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site. HUB Surface Systems reserves the right to modify these terms at any time. Continued use of the Site following any changes constitutes your acceptance of the revised terms.`,
  },
  {
    heading: "2. Use of the Site",
    body: `You may use this Site for lawful purposes only. You agree not to:

- Use the Site in any way that violates applicable federal, provincial, or local laws
- Transmit unsolicited commercial communications (spam)
- Attempt to gain unauthorized access to any portion of the Site or its related systems
- Use automated tools to scrape, crawl, or extract data from the Site without written permission
- Reproduce, republish, or redistribute any content without prior written consent`,
  },
  {
    heading: "3. Intellectual Property",
    body: `All content on this Site — including text, images, product descriptions, logos, graphics, and design — is the property of HUB Surface Systems or its licensors and is protected by Canadian and international copyright law.

Product names including TrafficPatterns, TrafficPatternsXD, StreetPrint, StreetBond, MMAX, DecoMark, DuraShield, DuraTherm, PreMark, and AirMark may be trademarks of their respective owners. Nothing on this Site grants any license or right to use any trademark without prior written permission.`,
  },
  {
    heading: "4. Product Information",
    body: `Product specifications, performance data, and application guidelines are provided for general information purposes. Actual performance may vary based on site conditions, climate, substrate type, application method, and maintenance practices.

HUB Surface Systems recommends consulting with a regional representative before specifying products for any project. Specification data sheets from your regional office represent the authoritative source for product performance.`,
  },
  {
    heading: "5. Disclaimer of Warranties",
    body: `This Site and its content are provided "as is" without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.

HUB Surface Systems does not warrant that the Site will be error-free, uninterrupted, or free of viruses or other harmful components.`,
  },
  {
    heading: "6. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, HUB Surface Systems shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this Site.

Our total liability for any claim arising out of or relating to these Terms shall not exceed one hundred Canadian dollars (CAD $100).`,
  },
  {
    heading: "7. Links to Third-Party Sites",
    body: `This Site may contain links to third-party websites for your convenience only. HUB Surface Systems does not endorse and is not responsible for the content, privacy practices, or accuracy of any third-party site. Accessing linked sites is at your own risk.`,
  },
  {
    heading: "8. Governing Law",
    body: `These Terms of Use are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.

Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of Ontario, Canada.`,
  },
  {
    heading: "9. Contact",
    body: `Questions about these Terms of Use may be directed to:

HUB Surface Systems

East Office — Milton, Ontario
doug.bain@hubss.com | 416-540-9287

West Office — Ladysmith, British Columbia
cleve.stordy@hubss.com | 604-309-8212`,
  },
];

export default function TermsPage() {
  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#f97316" }}>
          Legal
        </p>
        <h1 className="text-5xl font-bold mb-3 leading-tight" style={{ color: "#f5f0eb" }}>
          Terms of Use
        </h1>
        <p className="text-sm mb-12" style={{ color: "#9ca3af" }}>
          Last updated: March 2026
        </p>

        <p className="text-base leading-relaxed mb-12" style={{ color: "#9ca3af" }}>
          Please read these Terms of Use carefully before using hubss.com, operated by
          HUB Surface Systems. These terms govern your access to and use of the Site.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.heading} style={{ borderTop: "1px solid #333", paddingTop: "32px" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#f5f0eb" }}>
                {section.heading}
              </h2>
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ color: "#9ca3af" }}
              >
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
