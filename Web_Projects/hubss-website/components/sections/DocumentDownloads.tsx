// components/sections/DocumentDownloads.tsx
import { getDocsForProduct, docTypeLabel, type ProductDocument } from "@/lib/documents";

function DocRow({ doc, isLast }: { doc: ProductDocument; isLast: boolean }) {
  const label = doc.lang ? `${doc.label} (${doc.lang.toUpperCase()})` : doc.label;

  return (
    <a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 py-3 group"
      style={{ borderBottom: isLast ? "none" : "1px solid #333" }}
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

export default function DocumentDownloads({ slug }: { slug: string }) {
  const docs = getDocsForProduct(slug);
  if (docs.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#f5f0eb" }}>
        Downloads
      </h2>
      <div
        className="rounded-xl p-6"
        style={{ background: "#2d2d2d", border: "1px solid #333" }}
      >
        {docs.map((doc, idx) => (
          <DocRow key={idx} doc={doc} isLast={idx === docs.length - 1} />
        ))}
      </div>
    </div>
  );
}
