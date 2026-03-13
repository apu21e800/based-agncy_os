"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsGrid() {
  return (
    <section className="py-24" style={{ background: "#1a1a1a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#f97316" }}
          >
            Surface Solutions
          </p>
          <h2 className="text-5xl font-bold" style={{ color: "#f5f0eb" }}>
            Our Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#2a2a2a" }}>
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group block p-8 h-full relative overflow-hidden transition-all duration-200"
                style={{
                  background: "#222222",
                  borderLeft: "2px solid transparent",
                }}
              >
                {/* Orange left-border on hover */}
                <span
                  className="absolute inset-y-0 left-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "#f97316" }}
                />
                {/* Subtle lift shadow on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: "rgba(249,115,22,0.04)" }}
                />

                <div className="relative">
                  {/* Top accent bar */}
                  <div
                    className="w-8 h-0.5 mb-5 transition-all duration-200 group-hover:w-14"
                    style={{ background: "#f97316" }}
                  />

                  <h3
                    className="font-bold text-lg mb-1 transition-colors duration-200 group-hover:text-[#f97316]"
                    style={{ color: "#f5f0eb" }}
                  >
                    {product.name}
                  </h3>

                  <p
                    className="font-medium mb-4"
                    style={{ color: "#fb923c", fontSize: "13px" }}
                  >
                    {product.shortDesc}
                  </p>

                  <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#e5e7eb" }}>
                    {product.description.slice(0, 90)}
                    {product.description.length > 90 ? "..." : ""}
                  </p>

                  <span
                    className="text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider"
                    style={{ color: "#f97316" }}
                  >
                    Explore system
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
