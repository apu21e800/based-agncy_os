"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { projects } from "@/lib/projects";

type FilterType = "all" | "product" | "application" | "province";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<{ type: FilterType; value: string }>({ type: "all", value: "" });

  const productList = [...new Set(projects.map((p) => p.product))];
  const appTypes = [...new Set(projects.map((p) => p.application))];
  const provinces = [...new Set(projects.map((p) => p.province))];

  const filtered = useMemo(() => {
    if (filter.type === "all") return projects;
    if (filter.type === "product") return projects.filter((p) => p.product === filter.value);
    if (filter.type === "application") return projects.filter((p) => p.application === filter.value);
    if (filter.type === "province") return projects.filter((p) => p.province === filter.value);
    return projects;
  }, [filter]);

  const FilterBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="text-xs font-semibold px-4 py-2 rounded transition-all"
      style={{
        background: active ? "#f97316" : "#2d2d2d",
        color: active ? "#fff" : "#9ca3af",
        border: "1px solid",
        borderColor: active ? "#f97316" : "#333",
      }}
    >
      {label}
    </button>
  );

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#f97316" }}>
            Portfolio
          </p>
          <h1 className="text-6xl font-bold mb-4" style={{ color: "#f5f0eb" }}>Projects</h1>
          <p className="text-lg" style={{ color: "#9ca3af" }}>
            Surface solutions transforming Canadian streets and communities.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-12">
          <FilterBtn label="All" active={filter.type === "all"} onClick={() => setFilter({ type: "all", value: "" })} />
          <span className="text-xs self-center px-2" style={{ color: "#333" }}>Product:</span>
          {productList.map((p) => (
            <FilterBtn key={p} label={p} active={filter.type === "product" && filter.value === p} onClick={() => setFilter({ type: "product", value: p })} />
          ))}
          <span className="text-xs self-center px-2" style={{ color: "#333" }}>Application:</span>
          {appTypes.map((a) => (
            <FilterBtn key={a} label={a} active={filter.type === "application" && filter.value === a} onClick={() => setFilter({ type: "application", value: a })} />
          ))}
          <span className="text-xs self-center px-2" style={{ color: "#333" }}>Province:</span>
          {provinces.map((prov) => (
            <FilterBtn key={prov} label={prov} active={filter.type === "province" && filter.value === prov} onClick={() => setFilter({ type: "province", value: prov })} />
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden rounded"
              style={{ background: "#2d2d2d" }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${project.imageSeed}/800/600`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
                  >
                    {project.product}
                  </span>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af" }}
                  >
                    {project.application}
                  </span>
                </div>
                <h3 className="font-bold text-base leading-snug mb-2" style={{ color: "#f5f0eb" }}>
                  {project.title}
                </h3>
                <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
                  {project.city}, {project.province}
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#9ca3af" }}>
                  {project.excerpt.slice(0, 100)}...
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-xs font-semibold flex items-center gap-1"
                  style={{ color: "#f97316" }}
                >
                  View Project &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
