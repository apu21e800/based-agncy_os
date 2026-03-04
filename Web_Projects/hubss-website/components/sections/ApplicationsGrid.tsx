"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const applications = [
  { name: "Crosswalks", slug: "crosswalks", seed: "hubss-app1", col: "col-span-2 row-span-2" },
  { name: "Bus & Bike Lanes", slug: "bus-bike-lanes", seed: "hubss-app2", col: "" },
  { name: "Driveways", slug: "driveways", seed: "hubss-app3", col: "" },
  { name: "Public Art", slug: "public-art", seed: "hubss-app4", col: "row-span-2" },
  { name: "Regulatory Markings", slug: "regulatory-markings", seed: "hubss-app5", col: "" },
  { name: "Parks & Paths", slug: "parks-paths", seed: "hubss-app6", col: "col-span-2" },
  { name: "Community Branding", slug: "community-branding", seed: "hubss-app7", col: "" },
  { name: "Parking Lots", slug: "parking-lots", seed: "hubss-app8", col: "" },
];

export default function ApplicationsGrid() {
  return (
    <section className="py-24" style={{ background: "#111111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#f97316" }}
          >
            Applications
          </p>
          <h2 className="text-5xl font-bold" style={{ color: "#f5f0eb" }}>
            Where We Work
          </h2>
        </div>

        <div
          className="grid grid-cols-4 gap-3"
          style={{ gridAutoRows: "200px" }}
        >
          {applications.map((app, i) => (
            <motion.div
              key={app.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden group ${app.col}`}
              style={{ borderRadius: "4px" }}
            >
              <Link href={`/applications/${app.slug}`} className="block w-full h-full">
                <Image
                  src={`https://picsum.photos/seed/${app.seed}/800/600`}
                  alt={app.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity"
                  style={{ background: "rgba(26,26,26,0.55)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(249,115,22,0.25)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-bold text-base" style={{ color: "#f5f0eb" }}>
                    {app.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
