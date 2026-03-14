"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Layers, Shield, PenTool, Paintbrush, Zap, Palette,
  ShieldCheck, Flame, Milestone, PlaneLanding,
  ArrowLeftRight, Bus, Home, Sparkles, TriangleAlert,
  TreePine, Building2, SquareParking, Plane,
  ChevronDown, Menu, X, type LucideIcon,
} from "lucide-react";
import { products } from "@/lib/products";
import { applications } from "@/lib/applications";
import { projects } from "@/lib/projects";

// ─── Types ────────────────────────────────────────────────────────────────────

type Panel = "products" | "applications" | null;
type MobileExpanded = "products" | "applications" | null;

// ─── Icon maps ────────────────────────────────────────────────────────────────

const PRODUCT_ICONS: Record<string, LucideIcon> = {
  "traffic-patterns":    Layers,
  "traffic-patterns-xd": Shield,
  "streetprint":         PenTool,
  "streetbond":          Paintbrush,
  "mmax":                Zap,
  "decomark":            Palette,
  "durashield":          ShieldCheck,
  "duratherm":           Flame,
  "premark":             Milestone,
  "airmark":             PlaneLanding,
};

const APP_ICONS: Record<string, LucideIcon> = {
  "crosswalks":          ArrowLeftRight,
  "bus-bike-lanes":      Bus,
  "driveways":           Home,
  "public-art":          Sparkles,
  "regulatory-markings": TriangleAlert,
  "parks-paths":         TreePine,
  "community-branding":  Building2,
  "parking-lots":        SquareParking,
  "airports":            Plane,
};

// ─── Constants ────────────────────────────────────────────────────────────────

const PLAIN_LINKS = [
  { label: "Projects",  href: "/projects" },
  { label: "About",     href: "/about" },
  { label: "Blog",      href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact",   href: "/contact" },
];

const GRAD: React.CSSProperties = {
  background:           "linear-gradient(90deg,#F97316,#EAB308)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor:  "transparent",
  backgroundClip:       "text",
};

const GEIST: React.CSSProperties = {
  fontFamily: "var(--font-geist), system-ui, sans-serif",
};

// Featured project (first in list)
const featuredProject = projects[0];

// ─── Stats strip (shared between panels) ─────────────────────────────────────

function StatsStrip() {
  const items = [
    { value: "30+",  label: "Years" },
    { value: "500+", label: "Projects" },
    { value: "10",   label: "Systems" },
  ];
  return (
    <div
      className="flex"
      style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, overflow: "hidden" }}
    >
      {items.map((s, i) => (
        <div
          key={s.label}
          className="flex-1 py-3 text-center"
          style={{ borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
        >
          <p className="text-lg font-black leading-none mb-0.5" style={{ ...GRAD, ...GEIST }}>{s.value}</p>
          <p className="text-[0.58rem] uppercase tracking-[0.1em]" style={{ color: "#374151" }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Contact strip ────────────────────────────────────────────────────────────

function ContactStrip() {
  return (
    <Link
      href="/contact"
      className="flex items-center justify-between p-3.5 rounded-[8px] transition-colors duration-150"
      style={{ border: "1px solid rgba(255,255,255,0.05)", background: "transparent" }}
    >
      <div>
        <p className="text-[0.78rem] font-semibold" style={{ ...GEIST, color: "#9ca3af" }}>Talk to a specialist</p>
        <p className="text-[0.62rem] mt-0.5" style={{ color: "#374151" }}>East: Milton · West: Ladysmith</p>
      </div>
      <div
        className="text-[0.68rem] font-bold px-3 py-1.5 rounded-[6px] whitespace-nowrap"
        style={{ background: "linear-gradient(90deg,#F97316,#d97706)", color: "#fff" }}
      >
        Book →
      </div>
    </Link>
  );
}

// ─── Project card (right panel) ───────────────────────────────────────────────

function ProjectCard() {
  return (
    <div
      className="flex-1 flex flex-col rounded-[10px] overflow-hidden"
      style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Image */}
      <div
        className="relative flex-shrink-0"
        style={{
          height: 160,
          background: `linear-gradient(160deg,rgba(249,115,22,0.12),rgba(234,179,8,0.04),transparent)`,
          backgroundImage: `url(${featuredProject.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for legibility */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
        <div
          className="absolute top-2.5 left-2.5 text-[0.58rem] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.2)", color: "#f97316" }}
        >
          {featuredProject.city}, {featuredProject.province}
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col gap-1 flex-1">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.1em]" style={{ color: "#374151" }}>
          {featuredProject.application} · {featuredProject.product}
        </p>
        <p
          className="text-[0.85rem] font-bold leading-snug"
          style={{ ...GEIST, color: "#e5e7eb" }}
        >
          {featuredProject.title.length > 60
            ? featuredProject.title.slice(0, 60) + "…"
            : featuredProject.title}
        </p>
      </div>
    </div>
  );
}

// ─── Right column (shared layout) ─────────────────────────────────────────────

function RightCol({ showProject }: { showProject: boolean }) {
  return (
    <div
      className="flex flex-col gap-3 p-6"
      style={{ width: 340, background: "#060606", borderLeft: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}
    >
      {showProject && (
        <>
          <p className="text-[0.58rem] font-bold tracking-[0.18em] uppercase" style={{ color: "#1e1e1e" }}>
            Recent Project
          </p>
          <ProjectCard />
        </>
      )}
      {!showProject && <div className="flex-1" />}
      <StatsStrip />
      <ContactStrip />
    </div>
  );
}

// ─── Products overlay ─────────────────────────────────────────────────────────

function ProductsOverlay({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
      className="fixed inset-0 z-40 flex flex-col"
      style={{ paddingTop: 64, background: "#0a0a0a" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="region"
      aria-label="Products menu"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut", delay: 0.05 } }}
        className="flex flex-1 overflow-hidden"
      >
        {/* Left: product list */}
        <div
          className="flex-1 flex flex-col justify-center overflow-y-auto px-10 py-8"
          style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[0.58rem] font-black tracking-[0.2em] uppercase mb-6" style={GRAD}>
            Surface Systems
          </p>

          <div className="flex flex-col">
            {products.map((p, i) => {
              const Icon = PRODUCT_ICONS[p.slug];
              return (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg transition-all duration-150 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-orange-500/60"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                >
                  <span
                    className="text-[0.62rem] font-black w-6 flex-shrink-0 text-right transition-colors duration-150"
                    style={{ ...GEIST, color: "#1e1e1e", fontVariantNumeric: "tabular-nums" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="flex items-center justify-center flex-shrink-0 transition-colors duration-150"
                    style={{ width: 30, height: 30, background: "rgba(249,115,22,0.08)", borderRadius: 7, border: "1px solid rgba(249,115,22,0.1)" }}
                  >
                    {Icon && <Icon size={14} stroke="#f97316" strokeWidth={2} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="block text-[1rem] font-bold leading-tight transition-colors duration-150 group-hover:text-white"
                      style={{ ...GEIST, color: "#6b7280" }}
                    >
                      {p.name}
                    </span>
                    <span
                      className="block text-[0.7rem] mt-0.5 transition-colors duration-150 group-hover:text-[#6b7280]"
                      style={{ color: "#262626" }}
                    >
                      {p.shortDesc}
                    </span>
                  </div>
                  <span
                    className="text-sm flex-shrink-0 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: "#f97316" }}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/products"
            className="mt-5 flex items-center gap-1.5 text-[0.7rem] transition-colors duration-150 hover:text-gray-400"
            style={{ color: "#262626" }}
          >
            View all products <span style={GRAD} className="font-bold">→</span>
          </Link>
        </div>

        {/* Right: project + stats + contact */}
        <RightCol showProject={true} />
      </motion.div>
    </motion.div>
  );
}

// ─── Applications overlay ─────────────────────────────────────────────────────

function ApplicationsOverlay({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
      className="fixed inset-0 z-40 flex flex-col"
      style={{ paddingTop: 64, background: "#0a0a0a" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="region"
      aria-label="Applications menu"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut", delay: 0.05 } }}
        className="flex flex-1 overflow-hidden"
      >
        {/* Left: application list */}
        <div
          className="flex-1 flex flex-col justify-center overflow-y-auto px-10 py-8"
          style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[0.58rem] font-black tracking-[0.2em] uppercase mb-6" style={GRAD}>
            Applications
          </p>

          <div className="flex flex-col">
            {applications.map((app, i) => {
              const Icon = APP_ICONS[app.slug];
              return (
                <Link
                  key={app.slug}
                  href={`/applications/${app.slug}`}
                  className="group flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg transition-all duration-150 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-orange-500/60"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                >
                  <span
                    className="text-[0.62rem] font-black w-6 flex-shrink-0 text-right transition-colors duration-150"
                    style={{ ...GEIST, color: "#1e1e1e", fontVariantNumeric: "tabular-nums" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ width: 30, height: 30, background: "rgba(249,115,22,0.08)", borderRadius: 7, border: "1px solid rgba(249,115,22,0.1)" }}
                  >
                    {Icon && <Icon size={14} stroke="#f97316" strokeWidth={2} />}
                  </div>
                  <span
                    className="flex-1 text-[1rem] font-bold leading-tight transition-colors duration-150 group-hover:text-white"
                    style={{ ...GEIST, color: "#6b7280" }}
                  >
                    {app.name}
                  </span>
                  <span
                    className="text-sm flex-shrink-0 opacity-0 -translate-x-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: "#f97316" }}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/applications"
            className="mt-5 flex items-center gap-1.5 text-[0.7rem] transition-colors duration-150 hover:text-gray-400"
            style={{ color: "#262626" }}
          >
            View all applications <span style={GRAD} className="font-bold">→</span>
          </Link>
        </div>

        {/* Right: stats + contact (no project card) */}
        <RightCol showProject={false} />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Nav ─────────────────────────────────────────────────────────────────

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled]             = useState(false);
  const [activePanel, setActivePanel]       = useState<Panel>(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<MobileExpanded>(null);

  const navRef         = useRef<HTMLElement>(null);
  const closeTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setActivePanel(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Escape + cleanup
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
        lastTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Timer helpers
  const startCloseTimer = () => {
    closeTimerRef.current = setTimeout(() => setActivePanel(null), 150);
  };
  const cancelCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };
  const openPanel = (panel: Panel, trigger: HTMLElement) => {
    cancelCloseTimer();
    lastTriggerRef.current = trigger;
    setActivePanel(panel);
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:           scrolled || activePanel ? "rgba(8,8,8,0.98)" : "rgba(26,26,26,0.95)",
          backdropFilter:       "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom:         "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Wordmark */}
            <Link href="/" className="flex items-center" onClick={() => setActivePanel(null)}>
              <span style={{ color: "#f5f0eb", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em", ...GEIST }}>
                HUB
              </span>
              <span style={{ ...GRAD, ...GEIST, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
                SS
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-0.5">

              {/* Products trigger */}
              <Link
                href="/products"
                className="flex items-center gap-1 text-[0.78rem] font-medium px-3 py-2 relative transition-colors duration-150"
                style={{ color: activePanel === "products" || pathname.startsWith("/products") ? "#f5f0eb" : "#6b7280" }}
                onMouseEnter={(e) => openPanel("products", e.currentTarget)}
                onMouseLeave={startCloseTimer}
                aria-expanded={activePanel === "products"}
                aria-haspopup="true"
              >
                Products
                <ChevronDown size={13} className="transition-transform duration-200"
                  style={{ transform: activePanel === "products" ? "rotate(180deg)" : "rotate(0deg)" }} />
                <span className="absolute bottom-0.5 left-3 right-3 h-px"
                  style={{ background: "linear-gradient(90deg,#f97316,#eab308)", opacity: activePanel === "products" || pathname.startsWith("/products") ? 1 : 0 }} />
              </Link>

              {/* Applications trigger */}
              <Link
                href="/applications"
                className="flex items-center gap-1 text-[0.78rem] font-medium px-3 py-2 relative transition-colors duration-150"
                style={{ color: activePanel === "applications" || pathname.startsWith("/applications") ? "#f5f0eb" : "#6b7280" }}
                onMouseEnter={(e) => openPanel("applications", e.currentTarget)}
                onMouseLeave={startCloseTimer}
                aria-expanded={activePanel === "applications"}
                aria-haspopup="true"
              >
                Applications
                <ChevronDown size={13} className="transition-transform duration-200"
                  style={{ transform: activePanel === "applications" ? "rotate(180deg)" : "rotate(0deg)" }} />
                <span className="absolute bottom-0.5 left-3 right-3 h-px"
                  style={{ background: "linear-gradient(90deg,#f97316,#eab308)", opacity: activePanel === "applications" || pathname.startsWith("/applications") ? 1 : 0 }} />
              </Link>

              {/* Plain links */}
              {PLAIN_LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[0.78rem] font-medium px-3 py-2 relative group transition-colors duration-150"
                    style={{ color: active ? "#f5f0eb" : "#6b7280" }}
                  >
                    {link.label}
                    <span className="absolute bottom-0.5 left-3 right-3 h-px transition-opacity duration-200 group-hover:opacity-60"
                      style={{ background: "linear-gradient(90deg,#f97316,#eab308)", opacity: active ? 1 : 0 }} />
                  </Link>
                );
              })}

              {/* CTA */}
              <Link
                href="/contact"
                className="ml-3 text-[0.72rem] font-bold px-5 py-2 rounded-full transition-all duration-150 hover:brightness-110 whitespace-nowrap"
                style={{ background: "linear-gradient(90deg,#F97316,#d97706)", color: "#fff" }}
              >
                Book Lunch &amp; Learn
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2"
              style={{ color: "#f5f0eb" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.15 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.1 } }}
              className="md:hidden px-4 pb-5 flex flex-col"
              style={{ borderTop: "1px solid #1e1e1e", paddingTop: 12 }}
            >
              {/* Products accordion */}
              <div>
                <button
                  className="flex items-center justify-between w-full px-2 py-2.5 text-sm font-medium"
                  style={{ color: pathname.startsWith("/products") ? "#f97316" : "#9ca3af" }}
                  onClick={() => setMobileExpanded(mobileExpanded === "products" ? null : "products")}
                  aria-expanded={mobileExpanded === "products"}
                >
                  Products
                  <ChevronDown size={15} className="transition-transform duration-200"
                    style={{ transform: mobileExpanded === "products" ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "products" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: 0.18 } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.13 } }}
                      className="overflow-hidden pl-3"
                    >
                      {products.map((p) => (
                        <Link key={p.slug} href={`/products/${p.slug}`}
                          className="block px-2 py-2 text-sm" style={{ color: "#6b7280" }}>
                          {p.name}
                        </Link>
                      ))}
                      <Link href="/products" className="block px-2 py-2 text-xs font-semibold" style={{ color: "#f97316" }}>
                        View all products →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Applications accordion */}
              <div>
                <button
                  className="flex items-center justify-between w-full px-2 py-2.5 text-sm font-medium"
                  style={{ color: pathname.startsWith("/applications") ? "#f97316" : "#9ca3af" }}
                  onClick={() => setMobileExpanded(mobileExpanded === "applications" ? null : "applications")}
                  aria-expanded={mobileExpanded === "applications"}
                >
                  Applications
                  <ChevronDown size={15} className="transition-transform duration-200"
                    style={{ transform: mobileExpanded === "applications" ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "applications" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: 0.18 } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.13 } }}
                      className="overflow-hidden pl-3"
                    >
                      {applications.map((app) => (
                        <Link key={app.slug} href={`/applications/${app.slug}`}
                          className="block px-2 py-2 text-sm" style={{ color: "#6b7280" }}>
                          {app.name}
                        </Link>
                      ))}
                      <Link href="/applications" className="block px-2 py-2 text-xs font-semibold" style={{ color: "#f97316" }}>
                        View all applications →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Plain links */}
              {PLAIN_LINKS.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link key={link.href} href={link.href}
                    className="block px-2 py-2.5 text-sm font-medium"
                    style={{ color: active ? "#f97316" : "#9ca3af" }}>
                    {link.label}
                  </Link>
                );
              })}

              <Link href="/contact"
                className="mt-3 block text-sm font-bold px-5 py-3 rounded-full text-center"
                style={{ background: "linear-gradient(90deg,#F97316,#d97706)", color: "#fff" }}>
                Book Lunch &amp; Learn
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Full-viewport overlays (outside nav, behind it via z-40) */}
      <AnimatePresence mode="wait">
        {activePanel === "products" && (
          <ProductsOverlay
            key="products"
            onClose={() => setActivePanel(null)}
          />
        )}
        {activePanel === "applications" && (
          <ApplicationsOverlay
            key="applications"
            onClose={() => setActivePanel(null)}
          />
        )}
      </AnimatePresence>

      {/* Invisible hover bridge between nav triggers and overlay panels */}
      {activePanel && (
        <div
          className="fixed left-0 right-0 z-40"
          style={{ top: 64, height: 8 }}
          onMouseEnter={cancelCloseTimer}
          onMouseLeave={startCloseTimer}
        />
      )}
    </>
  );
}
