import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { projects } from "@/lib/projects";

const applications = [
  { name: "Crosswalks", slug: "crosswalks", seed: "hubss-app1", desc: "High-visibility pedestrian crossings that save lives and support Vision Zero frameworks across Canadian municipalities. HUB Surface Systems provides thermoplastic, stamped asphalt, and coloured pavement solutions for all crosswalk applications." },
  { name: "Bus & Bike Lanes", slug: "bus-bike-lanes", seed: "hubss-app2", desc: "Dedicated transit and cycling infrastructure markings that define Complete Streets corridors. From MMAX red resin bus lanes to StreetBond bike lane coatings — durable, high-visibility, long-lasting." },
  { name: "Driveways", slug: "driveways", seed: "hubss-app3", desc: "Decorative stamped asphalt and colour coatings for residential and commercial entrance treatments. StreetPrint and StreetBond deliver the look of premium pavers at a fraction of the cost." },
  { name: "Public Art", slug: "public-art", seed: "hubss-app4", desc: "Street-scale murals and artistic pavement installations celebrating community identity. DecoMark custom thermoplastic brings any design to the street with precision colour and lasting vibrancy." },
  { name: "Regulatory Markings", slug: "regulatory-markings", seed: "hubss-app5", desc: "AODA-compliant safety markings, symbols, and wayfinding systems for accessible public infrastructure. PreMark preformed symbols ensure consistent, code-compliant installations every time." },
  { name: "Parks & Paths", slug: "parks-paths", seed: "hubss-app6", desc: "Trail markings, plaza treatments, and recreational surface coatings for parks and greenways. StreetBond and DuraShield extend the life of recreational pavement while improving aesthetics." },
  { name: "Community Branding", slug: "community-branding", seed: "hubss-app7", desc: "Municipal identity and placemaking surfaces that give neighbourhoods a distinctive visual character. From BIA corridor treatments to gateway intersections — HUB makes streets memorable." },
  { name: "Parking Lots", slug: "parking-lots", seed: "hubss-app8", desc: "Durable markings, stall delineation, and protective coatings for commercial and municipal parking facilities. DuraShield restoration and PreMark symbols deliver a professional finish that lasts." },
];

export async function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  const app = applications.find((a) => a.slug === slug);
  if (!app) notFound();

  const relatedProjects = projects.filter((p) =>
    p.application.toLowerCase().replace(/[&\s]+/g, "-") === slug
  ).slice(0, 3);

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${app.seed}/1600/900`}
          alt={app.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "rgba(26,26,26,0.65)" }} />
        <div className="absolute inset-0 flex items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#f97316" }}>Application</p>
            <h1 className="text-6xl font-bold" style={{ color: "#f5f0eb" }}>{app.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-5" style={{ color: "#f5f0eb" }}>Overview</h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: "#9ca3af" }}>{app.desc}</p>

            {relatedProjects.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#f5f0eb" }}>Related Projects</h2>
                <div className="space-y-4">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group flex gap-5 p-5 rounded transition-colors"
                      style={{ background: "#2d2d2d", border: "1px solid #333" }}
                    >
                      <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={`https://picsum.photos/seed/${project.imageSeed}/300/200`}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1 group-hover:text-[#f97316] transition-colors" style={{ color: "#f5f0eb" }}>
                          {project.title}
                        </h3>
                        <p className="text-xs" style={{ color: "#9ca3af" }}>{project.city}, {project.province}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <div className="rounded-xl p-8" style={{ background: "#2d2d2d", border: "1px solid #333" }}>
              <h3 className="font-bold text-lg mb-5" style={{ color: "#f5f0eb" }}>Get Started</h3>
              <p className="text-sm mb-6" style={{ color: "#9ca3af" }}>
                Interested in this application for your municipality or project? Contact us for a consultation.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center font-semibold py-4 rounded-lg mb-3 text-sm"
                style={{ background: "#f97316", color: "#fff" }}
              >
                Request Consultation
              </Link>
              <Link
                href="/#lunch-learn"
                className="block w-full text-center font-semibold py-4 rounded-lg text-sm"
                style={{ border: "1px solid #333", color: "#f5f0eb" }}
              >
                Book Lunch &amp; Learn
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
