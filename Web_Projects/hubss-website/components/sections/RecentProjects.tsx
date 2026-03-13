"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";

export default function RecentProjects() {
  const featured = projects[0];
  const secondary = projects.slice(1, 3);

  return (
    <section className="py-24" style={{ background: "#1a1a1a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: "#f97316" }}
            >
              Portfolio
            </p>
            <h2 className="text-5xl font-bold" style={{ color: "#f5f0eb" }}>
              Recent Work
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:block text-sm font-semibold px-6 py-3 rounded transition-colors"
            style={{ border: "1px solid #333", color: "#d1d5db" }}
          >
            Browse All Projects
          </Link>
        </div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group grid grid-cols-1 md:grid-cols-5 gap-0 mb-3 overflow-hidden"
          style={{ borderRadius: "4px", background: "#2d2d2d" }}
        >
          <div className="relative md:col-span-3 h-64 md:h-auto min-h-[320px]">
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="md:col-span-2 p-10 flex flex-col justify-center">
            <div className="flex gap-2 mb-5">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
              >
                {featured.product}
              </span>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af" }}
              >
                {featured.application}
              </span>
            </div>
            <h3
              className="text-2xl font-bold mb-3 leading-tight"
              style={{ color: "#f5f0eb" }}
            >
              {featured.title}
            </h3>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#e5e7eb" }}>
              {featured.excerpt}
            </p>
            <p className="text-xs mb-6" style={{ color: "#d1d5db" }}>
              {featured.city}, {featured.province}
            </p>
            <Link
              href={`/projects/${featured.slug}`}
              className="text-sm font-semibold flex items-center gap-2 self-start"
              style={{ color: "#f97316" }}
            >
              View Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Two secondary projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {secondary.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden"
              style={{ borderRadius: "4px", background: "#2d2d2d" }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-7">
                <div className="flex gap-2 mb-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
                  >
                    {project.product}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-tight" style={{ color: "#f5f0eb" }}>
                  {project.title}
                </h3>
                <p className="text-xs mb-4" style={{ color: "#d1d5db" }}>
                  {project.city}, {project.province}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold flex items-center gap-2"
                  style={{ color: "#f97316" }}
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="text-sm font-semibold px-6 py-3 rounded"
            style={{ border: "1px solid #333", color: "#d1d5db" }}
          >
            Browse All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
