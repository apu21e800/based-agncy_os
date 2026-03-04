"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const clients = [
  "York Region", "City of Toronto", "Vancouver", "UBC",
  "London ON", "Kitchener", "Richmond BC", "City of Ottawa",
  "Mississauga", "Brampton", "Surrey BC", "Calgary",
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{ background: "#1a1a1a" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      {/* Orange left-edge accent */}
      <div
        className="absolute left-0 top-1/4 w-1 h-48"
        style={{ background: "#f97316" }}
      />

      {/* Main content */}
      <div className="flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: "#f97316" }}
          >
            HUB Surface Systems — Canadian Infrastructure Specialists
          </p>

          <h1
            className="text-6xl md:text-8xl font-bold leading-[0.95] mb-8"
            style={{ color: "#f5f0eb" }}
          >
            The Street Is Your
            <br />
            <span className="relative inline-block">
              Canvas.
              <motion.span
                className="absolute left-0 right-0 bottom-1"
                style={{ height: "5px", background: "#f97316", originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ color: "#9ca3af" }}
          >
            HUB Surface Systems transforms Canadian infrastructure into vibrant,
            durable civic identity. From Vision Zero crosswalks to decorative bus
            lanes — we redefine what streets can be.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/projects"
              className="font-semibold px-8 py-4 rounded text-center transition-colors text-sm"
              style={{ background: "#f97316", color: "#fff" }}
            >
              View Our Work
            </Link>
            <Link
              href="/products"
              className="font-semibold px-8 py-4 rounded text-center transition-colors text-sm"
              style={{
                background: "transparent",
                color: "#f5f0eb",
                border: "1px solid #333",
              }}
            >
              Request Spec Sheet
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div
        className="overflow-hidden py-4"
        style={{ borderTop: "1px solid #333", borderBottom: "1px solid #333" }}
      >
        <div className="ticker-track">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="mx-8 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#333333", whiteSpace: "nowrap" }}
            >
              {client}
              <span className="ml-8" style={{ color: "#f97316" }}>&#10022;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
