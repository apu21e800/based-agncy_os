"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { applications } from "@/lib/applications";

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          style={{ gridAutoRows: "200px" }}
        >
          {applications.map((app, i) => (
            <motion.div
              key={app.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden group ${app.col ?? ""}`}
              style={{ borderRadius: "4px" }}
            >
              <Link href={`/applications/${app.slug}`} className="block w-full h-full">
                <Image
                  src={app.imageUrl}
                  alt={app.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
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
