"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "30+",     label: "Years Experience" },
  { value: "500+",    label: "Projects Delivered" },
  { value: "10",      label: "Provinces Served" },
  { value: "20 Year", label: "Durability Guarantee" },
];

const GRAD: React.CSSProperties = {
  background:           "linear-gradient(90deg, #F97316, #EAB308)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor:  "transparent",
  backgroundClip:       "text",
};

export default function StatsBar() {
  return (
    <section className="py-16" style={{ background: "#111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="text-center py-6 px-4"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <p
                className="text-4xl font-black mb-1.5 leading-none"
                style={{ ...GRAD, fontFamily: "var(--font-geist), system-ui, sans-serif" }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs font-medium uppercase tracking-[0.1em]"
                style={{ color: "#4b5563" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
