"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "30+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "10", label: "Provinces Served" },
  { value: "20 Year", label: "Durability Guarantee" },
];

export default function StatsBar() {
  return (
    <section
      className="py-12 relative overflow-hidden"
      style={{
        background: "#1a1a1a",
        borderTop: "1px solid #f97316",
        borderBottom: "1px solid #f97316",
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.12) 0%, rgba(234,179,8,0.12) 100%)" }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <p
                className="text-4xl font-bold mb-1"
                style={{ color: "#f97316" }}
              >
                {stat.value}
              </p>
              <p className="text-sm font-medium" style={{ color: "#d1d5db" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
