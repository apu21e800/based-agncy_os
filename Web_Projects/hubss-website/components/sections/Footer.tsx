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
  {
    label: "X (Twitter)",
    href: "#", // TODO: add real URL
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "#", // TODO: add real URL
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "#", // TODO: add real URL
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    href: "#", // TODO: add real URL
    path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
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
            <p className="text-sm leading-relaxed mb-1" style={{ color: "#9ca3af" }}>
              Redefining Canadian Hardscapes Since 1994
            </p>
            <p className="text-xs mb-6" style={{ color: "#4b5563" }}>
              Proud to work coast to coast — all 10 provinces
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded flex items-center justify-center transition-colors hover:text-white"
                  style={{
                    background: "#2d2d2d",
                    border: "1px solid #333",
                    color: "#9ca3af",
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
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
