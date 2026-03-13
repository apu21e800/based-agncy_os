import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { projects } from "@/lib/projects";
import { products } from "@/lib/products";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const productEntry = products.find((p) => p.name === project.product);

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && (p.product === project.product || p.application === project.application))
    .slice(0, 3);

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "rgba(26,26,26,0.7)" }} />
        <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-3xl">
            <div className="flex gap-2 mb-4">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(249,115,22,0.2)", color: "#f97316" }}
              >
                {project.product}
              </span>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "#9ca3af" }}
              >
                {project.application}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#f5f0eb" }}>
              {project.title}
            </h1>
            <p className="text-sm mt-3" style={{ color: "#9ca3af" }}>
              {project.city}, {project.province}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "#f5f0eb" }}>Project Overview</h2>
            <p className="text-[16px] leading-relaxed mb-10" style={{ color: "#e5e7eb" }}>
              {project.excerpt}
            </p>

            {/* Gallery — swap /public/images/projects/[slug]/ photos in when available */}
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#f5f0eb" }}>Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="relative aspect-square overflow-hidden rounded">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} - Photo ${n}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-xl p-8 sticky top-24" style={{ background: "#2d2d2d", border: "1px solid #333" }}>
              <h3 className="font-bold text-lg mb-6" style={{ color: "#f5f0eb" }}>Project Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Product", value: project.product },
                  { label: "Application", value: project.application },
                  { label: "Location", value: `${project.city}, ${project.province}` },
                ].map((detail) => (
                  <div key={detail.label} className="flex justify-between text-sm" style={{ borderBottom: "1px solid #333", paddingBottom: "12px" }}>
                    <span style={{ color: "#d1d5db" }}>{detail.label}</span>
                    <span className="font-semibold text-right" style={{ color: "#f5f0eb" }}>{detail.value}</span>
                  </div>
                ))}
              </div>

              <Link
                href={productEntry ? `/products/${productEntry.slug}` : "/products"}
                className="block w-full text-center font-semibold py-4 rounded-lg mt-8 text-sm"
                style={{ background: "#f97316", color: "#fff" }}
              >
                View {project.product} Product
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center font-semibold py-4 rounded-lg mt-3 text-sm"
                style={{ border: "1px solid #333", color: "#f5f0eb" }}
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mt-20 pt-16" style={{ borderTop: "1px solid #333" }}>
            <h2 className="text-2xl font-bold mb-8" style={{ color: "#f5f0eb" }}>Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group overflow-hidden rounded"
                  style={{ background: "#2d2d2d" }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded mb-3 inline-block"
                      style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
                    >
                      {p.product}
                    </span>
                    <h3 className="font-bold text-sm leading-snug group-hover:text-[#f97316] transition-colors" style={{ color: "#f5f0eb" }}>
                      {p.title}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "#d1d5db" }}>{p.city}, {p.province}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
