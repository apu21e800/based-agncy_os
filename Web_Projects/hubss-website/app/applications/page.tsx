import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { applications } from "@/lib/applications";

export const metadata: Metadata = {
  title: "Applications | HUB Surface Systems",
  description: "From crosswalks and bus lanes to airports and community branding — HUB Surface Systems delivers the right pavement solution for every application.",
};

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
                src={app.imageUrl}
                alt={app.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 transition-all" style={{ background: "rgba(26,26,26,0.6)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(249,115,22,0.2)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h2 className="font-bold text-lg mb-1" style={{ color: "#f5f0eb" }}>{app.name}</h2>
                <p className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#f5f0eb" }}>
                  {app.desc.slice(0, 80)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
