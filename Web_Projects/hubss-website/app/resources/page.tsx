// app/resources/page.tsx
import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { productDocuments, docTypeLabel, type ProductDocument } from "@/lib/documents";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Resources | HUB Surface Systems",
  description:
    "Spec sheets, brochures, installation guides, and technical data sheets for every HUB Surface Systems product.",
};

function DocRow({ doc, isLast }: { doc: ProductDocument; isLast: boolean }) {
  const label = doc.lang ? `${doc.label} (${doc.lang.toUpperCase()})` : doc.label;
  return (
    <a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 py-3 group"
      style={{ borderBottom: isLast ? "none" : "1px solid #3a3a3a" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded shrink-0"
          style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
        >
          {docTypeLabel[doc.type]}
        </span>
        <span className="text-sm truncate" style={{ color: "#f5f0eb" }}>
          {label}
        </span>
      </div>
      <svg
        className="w-4 h-4 shrink-0 transition-transform group-hover:translate-y-0.5"
        style={{ color: "#9ca3af" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </a>
  );
}

export default function ResourcesPage() {
  // Join with products to get display names and preserve product order
  const productsWithDocs = products
    .map((p) => ({
      ...p,
      docs: productDocuments.find((pd) => pd.slug === p.slug)?.docs ?? [],
    }))
    .filter((p) => p.docs.length > 0);

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-16 max-w-2xl">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#f97316" }}
          >
            Technical Library
          </p>
          <h1
            className="text-6xl font-bold mb-5 leading-tight"
            style={{ color: "#f5f0eb" }}
          >
            Resources
          </h1>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            Spec sheets, brochures, installation guides, and technical data sheets
            for every HUB Surface Systems product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productsWithDocs.map((product) => (
            <div
              key={product.slug}
              className="rounded-xl p-6"
              style={{ background: "#2d2d2d", border: "1px solid #333" }}
            >
              <h2
                className="font-bold text-lg mb-4"
                style={{ color: "#f5f0eb" }}
              >
                {product.name}
              </h2>
              {product.docs.map((doc, idx) => (
                <DocRow
                  key={`${doc.type}-${doc.href}`}
                  doc={doc}
                  isLast={idx === product.docs.length - 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
