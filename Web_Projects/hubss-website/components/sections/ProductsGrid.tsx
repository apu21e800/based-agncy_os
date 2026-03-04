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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "#333" }}>
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
                className="group block p-8 h-full relative overflow-hidden transition-all"
                style={{ background: "#2d2d2d" }}
              >
                {/* Orange hover bg */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(249,115,22,0.06)" }}
                />
                <div
                  className="w-8 h-0.5 mb-6 transition-all group-hover:w-16"
                  style={{ background: "#f97316" }}
                />
                <h3
                  className="font-bold text-xl mb-3 transition-colors group-hover:text-[#f97316]"
                  style={{ color: "#f5f0eb" }}
                >
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#9ca3af" }}>
                  {product.shortDesc}
                </p>
                <span
                  className="text-sm font-semibold flex items-center gap-2"
                  style={{ color: "#f97316" }}
                >
                  Learn more
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
