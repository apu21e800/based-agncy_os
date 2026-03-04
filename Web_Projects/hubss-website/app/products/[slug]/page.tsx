import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { products } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const gallerySeeds = [
    `${slug}-g1`, `${slug}-g2`, `${slug}-g3`,
    `${slug}-g4`, `${slug}-g5`, `${slug}-g6`,
  ];

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />

      {/* Hero banner */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${slug}-hero/1600/900`}
          alt={product.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "rgba(26,26,26,0.7)" }} />
        <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#f97316" }}>
              HUB Product System
            </p>
            <h1 className="text-6xl font-bold" style={{ color: "#f5f0eb" }}>
              {product.name}
            </h1>
            <p className="text-lg mt-2" style={{ color: "#9ca3af" }}>
              {product.shortDesc}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: description + gallery */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "#f5f0eb" }}>About {product.name}</h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "#9ca3af" }}>
              {product.description}
            </p>

            {/* Gallery */}
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#f5f0eb" }}>Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallerySeeds.map((seed) => (
                <div key={seed} className="relative aspect-square overflow-hidden rounded">
                  <Image
                    src={`https://picsum.photos/seed/${seed}/600/600`}
                    alt={`${product.name} installation`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: specs + CTA */}
          <div>
            <div className="rounded-xl p-8 mb-8 sticky top-24" style={{ background: "#2d2d2d", border: "1px solid #333" }}>
              <h3 className="font-bold text-lg mb-6" style={{ color: "#f5f0eb" }}>Specifications</h3>
              <div className="space-y-4">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm" style={{ borderBottom: "1px solid #333", paddingBottom: "12px" }}>
                    <span style={{ color: "#9ca3af" }}>{spec.label}</span>
                    <span className="font-semibold text-right max-w-[60%]" style={{ color: "#f5f0eb" }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="block w-full text-center font-semibold py-4 rounded-lg mt-8 transition-colors text-sm"
                style={{ background: "#f97316", color: "#fff" }}
              >
                Request Spec Sheet
              </Link>
              <Link
                href="/#lunch-learn"
                className="block w-full text-center font-semibold py-4 rounded-lg mt-3 transition-colors text-sm"
                style={{ background: "transparent", color: "#f5f0eb", border: "1px solid #333" }}
              >
                Book Lunch &amp; Learn
              </Link>
            </div>
          </div>
        </div>

        {/* Related applications */}
        <div className="mt-16 pt-16" style={{ borderTop: "1px solid #333" }}>
          <h2 className="text-2xl font-bold mb-8" style={{ color: "#f5f0eb" }}>Related Applications</h2>
          <div className="flex flex-wrap gap-3">
            {["Crosswalks", "Bus & Bike Lanes", "Parks & Paths", "Community Branding"].map((app) => (
              <Link
                key={app}
                href={`/applications/${app.toLowerCase().replace(/[&\s]+/g, "-")}`}
                className="text-sm font-semibold px-5 py-2.5 rounded transition-colors"
                style={{ background: "#2d2d2d", color: "#9ca3af", border: "1px solid #333" }}
              >
                {app}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
