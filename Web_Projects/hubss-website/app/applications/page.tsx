import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";

const applications = [
  { name: "Crosswalks", slug: "crosswalks", seed: "hubss-app1", desc: "High-visibility pedestrian crossings that save lives and support Vision Zero frameworks across Canadian municipalities." },
  { name: "Bus & Bike Lanes", slug: "bus-bike-lanes", seed: "hubss-app2", desc: "Dedicated transit and cycling infrastructure markings that define Complete Streets corridors." },
  { name: "Driveways", slug: "driveways", seed: "hubss-app3", desc: "Decorative stamped asphalt and colour coatings for residential and commercial entrance treatments." },
  { name: "Public Art", slug: "public-art", seed: "hubss-app4", desc: "Street-scale murals and artistic pavement installations celebrating community identity." },
  { name: "Regulatory Markings", slug: "regulatory-markings", seed: "hubss-app5", desc: "AODA-compliant safety markings, symbols, and wayfinding systems for accessible public infrastructure." },
  { name: "Parks & Paths", slug: "parks-paths", seed: "hubss-app6", desc: "Trail markings, plaza treatments, and recreational surface coatings for parks and greenways." },
  { name: "Community Branding", slug: "community-branding", seed: "hubss-app7", desc: "Municipal identity and placemaking surfaces that give neighbourhoods a distinctive visual character." },
  { name: "Parking Lots", slug: "parking-lots", seed: "hubss-app8", desc: "Durable markings, stall delineation, and protective coatings for commercial and municipal parking facilities." },
];

export default function ApplicationsPage() {
  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#f97316" }}>
            Applications
          </p>
          <h1 className="text-6xl font-bold mb-5 leading-tight" style={{ color: "#f5f0eb" }}>
            Every Surface.
            <br />
            Every City.
          </h1>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            From provincial highways to neighbourhood laneways — HUB Surface Systems
            delivers the right solution for every surface application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {applications.map((app) => (
            <Link
              key={app.slug}
              href={`/applications/${app.slug}`}
              className="group relative overflow-hidden rounded block"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={`https://picsum.photos/seed/${app.seed}/800/600`}
                alt={app.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 transition-all" style={{ background: "rgba(26,26,26,0.6)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(249,115,22,0.2)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="font-bold text-lg mb-1" style={{ color: "#f5f0eb" }}>{app.name}</h2>
                <p className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#f5f0eb" }}>{app.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
