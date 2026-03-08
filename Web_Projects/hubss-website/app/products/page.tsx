import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products | HUB Surface Systems",
  description: "Ten purpose-built surface treatment systems — thermoplastics, MMA resins, stamped asphalt, and protective coatings for Canadian municipalities and contractors.",
};

export default function ProductsPage() {
  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#f97316" }}>
            Our Systems
          </p>
          <h1 className="text-6xl font-bold mb-5 leading-tight" style={{ color: "#f5f0eb" }}>
            Built to Perform.
            <br />
            Designed to Last.
          </h1>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            Eight purpose-built surface treatment systems — each engineered for a specific
            performance requirement, climate condition, and application context.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#333" }}>
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block p-8 relative overflow-hidden transition-all"
              style={{ background: "#2d2d2d" }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(249,115,22,0.06)" }}
              />
              <div className="w-8 h-0.5 mb-6 transition-all group-hover:w-16" style={{ background: "#f97316" }} />
              <h2 className="font-bold text-xl mb-3 transition-colors group-hover:text-[#f97316]" style={{ color: "#f5f0eb" }}>
                {product.name}
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#9ca3af" }}>
                {product.shortDesc}
              </p>
              <span className="text-sm font-semibold flex items-center gap-2" style={{ color: "#f97316" }}>
                Explore
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
