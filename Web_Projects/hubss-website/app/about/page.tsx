import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import LunchLearn from "@/components/sections/LunchLearn";

export const metadata: Metadata = {
  title: "About | HUB Surface Systems",
  description: "30 years transforming Canadian streets, crosswalks, and public spaces. Two regional offices — Milton, Ontario and Ladysmith, BC — serving all 10 provinces.",
};

const differentiators = [
  { title: "Flexibility vs Concrete", desc: "Asphalt-based systems flex with Canada's freeze-thaw cycles, outlasting concrete alternatives by 2–3x in northern climates." },
  { title: "6–8x Longer Than Paint", desc: "Thermoplastic and MMA markings deliver 6–8 years of service life versus 12–18 months for standard traffic paint." },
  { title: "Vision Zero Aligned", desc: "Every HUB product is designed to support Vision Zero frameworks — from retroreflective crosswalk markings to high-contrast bike lane systems." },
  { title: "AODA Compliant", desc: "Our tactile and high-contrast marking solutions meet or exceed AODA accessibility requirements across all provinces." },
  { title: "20-Year Durability", desc: "StreetPrint and StreetBond installations carry a 20-year colour retention warranty — the best in the industry." },
  { title: "Canadian-Specific", desc: "Every system is engineered and tested for Canadian climate extremes, from Ladysmith BC to York Region ON." },
];

export default function AboutPage() {
  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#f97316" }}>
          About HUB Surface Systems
        </p>
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight max-w-3xl" style={{ color: "#f5f0eb" }}>
          30 Years of
          <br />
          Surface Excellence
        </h1>
        <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "#e5e7eb" }}>
          HUB Surface Systems has been transforming Canadian streets, crosswalks, and public spaces
          since 1994. What started as a single-product distributor has grown into Canada&apos;s most
          comprehensive decorative pavement solutions provider.
        </p>
      </div>

      {/* Story */}
      <div className="py-20" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#f5f0eb" }}>Our Story</h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#e5e7eb" }}>
                <p>
                  HUB Surface Systems was founded with a simple belief: streets don&apos;t have to be grey.
                  Canadian cities had spent decades treating pavement as pure utility — functional,
                  forgettable, interchangeable. We saw an opportunity to change that.
                </p>
                <p>
                  Starting with StreetPrint decorative stamped asphalt in the mid-1990s, we grew
                  our product portfolio to address every surface application challenge a Canadian
                  municipality might face — from high-traffic arterial markings to decorative
                  community crosswalks to Indigenous art installations.
                </p>
                <p>
                  Today, HUB operates from two regional offices — East in Milton, Ontario, and West
                  in Ladysmith, British Columbia — serving municipalities, developers, and contractors
                  in every province. Our products have transformed thousands of intersections, plazas,
                  driveways, and public spaces across the country.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#f5f0eb" }}>Our Mission</h2>
              <p className="text-xl leading-relaxed mb-8" style={{ color: "#f5f0eb", borderLeft: "3px solid #f97316", paddingLeft: "24px" }}>
                &ldquo;To transform Canadian infrastructure into vibrant, durable civic identity —
                one surface at a time.&rdquo;
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#e5e7eb" }}>
                We believe that the quality of a community&apos;s public spaces reflects its values.
                When streets are beautiful, accessible, and legible, people use them differently —
                they walk more, drive slower, and feel more connected to where they live.
                Every HUB installation is a contribution to a more livable Canada.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Offices */}
      <div className="py-20" style={{ background: "#1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10" style={{ color: "#f5f0eb" }}>Regional Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                region: "East Office",
                territory: "Western Canada",
                city: "Milton, Ontario",
                contact: "Doug Bain",
                email: "doug.bain@hubss.com",
                phone: "416-540-9287",
                provinces: ["ON", "QC", "NS", "NB", "PE", "NL", "MB"],
              },
              {
                region: "West Office",
                territory: "Eastern Canada",
                city: "Ladysmith, British Columbia",
                contact: "Cleve Stordy",
                email: "cleve.stordy@hubss.com",
                phone: "604-309-8212",
                provinces: ["BC", "AB", "SK", "NT", "YT", "NU"],
              },
            ].map((office) => (
              <div
                key={office.region}
                className="p-8 rounded-xl relative overflow-hidden"
                style={{ background: "#222222", border: "1px solid #2a2a2a" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "#f97316" }}
                />
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#f97316" }}>
                  {office.region}
                </p>
                <h3 className="text-xl font-bold mb-1" style={{ color: "#f5f0eb" }}>{office.city}</h3>
                <p className="text-sm mb-5" style={{ color: "#d1d5db" }}>{office.contact}</p>

                {/* Province tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {office.provinces.map((prov) => (
                    <span
                      key={prov}
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}
                    >
                      {prov}
                    </span>
                  ))}
                </div>

                <a
                  href={`mailto:${office.email}`}
                  className="text-sm block mb-1.5 transition-colors hover:text-[#f97316]"
                  style={{ color: "#d1d5db" }}
                >
                  {office.email}
                </a>
                <a
                  href={`tel:${office.phone.replace(/-/g, "")}`}
                  className="text-sm transition-colors hover:text-[#f97316]"
                  style={{ color: "#d1d5db" }}
                >
                  {office.phone}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: "#d1d5db" }}>
            Serving all 10 provinces and 3 territories
          </p>
        </div>
      </div>

      {/* Why HUB */}
      <div className="py-20" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12" style={{ color: "#f5f0eb" }}>Why HUB</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {differentiators.map((d) => (
              <div key={d.title} className="p-7 rounded-xl" style={{ background: "#2d2d2d", border: "1px solid #333" }}>
                <div className="w-8 h-0.5 mb-5" style={{ background: "#f97316" }} />
                <h3 className="font-bold text-lg mb-3" style={{ color: "#f5f0eb" }}>{d.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#e5e7eb" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LunchLearn />
      <Footer />
    </main>
  );
}
