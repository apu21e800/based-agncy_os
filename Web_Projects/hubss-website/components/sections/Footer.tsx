import Link from "next/link";
import { products } from "@/lib/products";

const applications = [
  { label: "Crosswalks", slug: "crosswalks" },
  { label: "Bus & Bike Lanes", slug: "bus-bike-lanes" },
  { label: "Driveways", slug: "driveways" },
  { label: "Public Art", slug: "public-art" },
  { label: "Regulatory Markings", slug: "regulatory-markings" },
  { label: "Parks & Paths", slug: "parks-paths" },
  { label: "Community Branding", slug: "community-branding" },
  { label: "Parking Lots", slug: "parking-lots" },
];

const socials = [
  { label: "Twitter", icon: "\u{1D54F}" },
  { label: "Instagram", icon: "◻" },
  { label: "Facebook", icon: "f" },
  { label: "YouTube", icon: "▷" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0f0f0f", borderTop: "1px solid #333" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-0.5 mb-4">
              <span className="font-bold text-2xl" style={{ color: "#f5f0eb" }}>HUB</span>
              <span className="font-bold text-2xl" style={{ color: "#f97316" }}>SS</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#9ca3af" }}>
              Redefining Canadian Hardscapes Since 1994
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded flex items-center justify-center text-xs font-bold transition-colors"
                  style={{
                    background: "#2d2d2d",
                    border: "1px solid #333",
                    color: "#9ca3af",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm mb-5" style={{ color: "#f5f0eb" }}>Products</h4>
            <ul className="space-y-2.5">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm transition-colors hover:text-[#f97316]"
                    style={{ color: "#9ca3af" }}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h4 className="font-semibold text-sm mb-5" style={{ color: "#f5f0eb" }}>Applications</h4>
            <ul className="space-y-2.5">
              {applications.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/applications/${a.slug}`}
                    className="text-sm transition-colors hover:text-[#f97316]"
                    style={{ color: "#9ca3af" }}
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="font-semibold text-sm mb-5" style={{ color: "#f5f0eb" }}>Offices</h4>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#f97316" }}>East Office</p>
                <p className="text-sm mb-1" style={{ color: "#f5f0eb" }}>Milton, Ontario</p>
                <a href="mailto:doug.bain@hubss.com" className="text-xs block transition-colors hover:text-white" style={{ color: "#9ca3af" }}>doug.bain@hubss.com</a>
                <a href="tel:4165409287" className="text-xs block transition-colors hover:text-white" style={{ color: "#9ca3af" }}>416-540-9287</a>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#f97316" }}>West Office</p>
                <p className="text-sm mb-1" style={{ color: "#f5f0eb" }}>Ladysmith, BC</p>
                <a href="mailto:cleve.stordy@hubss.com" className="text-xs block transition-colors hover:text-white" style={{ color: "#9ca3af" }}>cleve.stordy@hubss.com</a>
                <a href="tel:6043098212" className="text-xs block transition-colors hover:text-white" style={{ color: "#9ca3af" }}>604-309-8212</a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #333" }}
        >
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            &copy; {new Date().getFullYear()} HUB Surface Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs transition-colors hover:text-white" style={{ color: "#9ca3af" }}>Privacy Policy</Link>
            <Link href="/terms" className="text-xs transition-colors hover:text-white" style={{ color: "#9ca3af" }}>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
