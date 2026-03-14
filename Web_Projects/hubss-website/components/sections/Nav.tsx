"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Layers,
  Shield,
  PenTool,
  Paintbrush,
  Zap,
  Palette,
  ShieldCheck,
  Flame,
  Milestone,
  PlaneLanding,
  ArrowLeftRight,
  Bus,
  Home,
  Sparkles,
  TriangleAlert,
  TreePine,
  Building2,
  SquareParking,
  Plane,
  ChevronDown,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { products } from "@/lib/products";
import { applications } from "@/lib/applications";

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

const PANEL_STYLE: React.CSSProperties = {
  background:  "#111",
  borderTop:   "3px solid transparent",
  borderImage: "linear-gradient(90deg, #F97316, #EAB308) 1",
  boxShadow:   "0 24px 48px rgba(0,0,0,0.8)",
};

const GRAD: React.CSSProperties = {
  background:           "linear-gradient(90deg,#F97316,#EAB308)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor:  "transparent",
  backgroundClip:       "text",
};

const panelVariants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" as const } },
  exit:    { opacity: 0, y: -4, transition: { duration: 0.13, ease: "easeIn"  as const } },
};

// ─── Gradient underline span (shared by all nav links) ────────────────────────

function GradLine({ visible }: { visible: boolean }) {
  return (
    <span
      className="absolute bottom-0.5 left-3 right-3 h-px transition-all duration-200"
      style={{
        background: "linear-gradient(90deg,#f97316,#eab308)",
        opacity:    visible ? 1 : 0,
        transform:  visible ? "scaleX(1)" : "scaleX(0.4)",
      }}
    />
  );
}

// ─── Products panel ───────────────────────────────────────────────────────────

function ProductsPanel({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      variants={panelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed left-0 right-0 z-50 flex"
      style={{ top: 64, ...PANEL_STYLE }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Products menu"
    >
      {/* Left: product grid */}
      <div className="flex-1 p-7" style={{ borderRight: "1px solid #1e1e1e" }}>
        <p className="text-[0.62rem] font-black tracking-[0.18em] uppercase mb-5" style={GRAD}>
          Products
        </p>

        <div className="grid grid-cols-3 gap-0.5">
          {products.map((p) => {
            const Icon = PRODUCT_ICONS[p.slug];
            return (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-[7px] group focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-2"
                style={{ outlineColor: "rgba(249,115,22,0.6)" }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 32, height: 32, background: "rgba(249,115,22,0.1)", borderRadius: 7 }}
                >
                  {Icon && <Icon size={16} stroke="#f97316" strokeWidth={2} />}
                </div>
                <div>
                  <div
                    className="text-[0.78rem] font-semibold leading-snug group-hover:text-white transition-colors duration-150"
                    style={{ color: "#e5e7eb" }}
                  >
                    {p.name}
                  </div>
                  <div className="text-[0.67rem] leading-tight mt-0.5" style={{ color: "#4b5563" }}>
                    {p.shortDesc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 pt-4" style={{ borderTop: "1px solid #1c1c1c" }}>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-[0.72rem] hover:text-gray-300 transition-colors"
            style={{ color: "#4b5563" }}
          >
            View all products{" "}
            <span style={GRAD} className="font-bold">→</span>
          </Link>
        </div>
      </div>

      {/* Right: featured callout */}
      <div
        className="flex flex-col p-6"
        style={{ width: 280, background: "#0d0d0d", borderLeft: "1px solid #1e1e1e" }}
      >
        <p
          className="text-[0.6rem] font-black tracking-[0.15em] uppercase mb-4"
          style={{ color: "#374151" }}
        >
          Featured
        </p>

        <div
          className="flex-1 flex flex-col rounded-[10px] overflow-hidden"
          style={{ background: "#141414", border: "1px solid #1e1e1e" }}
        >
          <div
            className="flex items-center justify-center text-[0.6rem] tracking-widest uppercase"
            style={{
              height: 96,
              background: "linear-gradient(135deg,rgba(249,115,22,0.15),rgba(234,179,8,0.08))",
              borderBottom: "1px solid #1e1e1e",
              color: "#374151",
            }}
          >
            Product Image
          </div>
          <div className="p-3.5">
            <p
              className="text-[0.58rem] font-bold tracking-[0.12em] uppercase mb-1.5"
              style={{ color: "#f97316" }}
            >
              New Application
            </p>
            <p className="text-[0.85rem] font-bold mb-1.5" style={{ color: "#f5f0eb" }}>
              Vision Zero Crosswalk Systems
            </p>
            <p className="text-[0.68rem] leading-[1.4]" style={{ color: "#4b5563" }}>
              StreetPrint + TrafficPatternsXD combined for maximum pedestrian visibility.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="mt-4 block text-center text-[0.7rem] font-semibold py-2.5 px-3.5 rounded-[7px] transition-colors duration-150 hover:bg-[rgba(249,115,22,0.14)]"
          style={{
            background: "rgba(249,115,22,0.08)",
            border:     "1px solid rgba(249,115,22,0.15)",
            color:      "#f97316",
          }}
        >
          Book a Lunch &amp; Learn →
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Applications panel ───────────────────────────────────────────────────────

function ApplicationsPanel({
  onMouseEnter,
  onMouseLeave,
}: {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      variants={panelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed left-0 right-0 z-50"
      style={{ top: 64, ...PANEL_STYLE }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Applications menu"
    >
      <div className="max-w-[900px] mx-auto px-8 py-7">
        <p className="text-[0.62rem] font-black tracking-[0.18em] uppercase mb-5" style={GRAD}>
          Applications
        </p>

        <div className="grid grid-cols-3 gap-0.5">
          {applications.map((app) => {
            const Icon = APP_ICONS[app.slug];
            return (
              <Link
                key={app.slug}
                href={`/applications/${app.slug}`}
                className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-[7px] group focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-2"
                style={{ outlineColor: "rgba(249,115,22,0.6)" }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{ width: 32, height: 32, background: "rgba(249,115,22,0.1)", borderRadius: 7 }}
                >
                  {Icon && <Icon size={16} stroke="#f97316" strokeWidth={2} />}
                </div>
                <div
                  className="text-[0.78rem] font-semibold leading-snug group-hover:text-white transition-colors duration-150"
                  style={{ color: "#e5e7eb" }}
                >
                  {app.name}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-5 pt-4" style={{ borderTop: "1px solid #1c1c1c" }}>
          <Link
            href="/applications"
            className="flex items-center gap-1.5 text-[0.72rem] hover:text-gray-300 transition-colors"
            style={{ color: "#4b5563" }}
          >
            View all applications{" "}
            <span style={GRAD} className="font-bold">→</span>
          </Link>
        </div>
      </div>
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

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setActivePanel(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Outside mousedown + Escape key
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
        lastTriggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // ── Timer helpers ──

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

  // ── Render ──

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:           scrolled ? "rgba(10,10,10,0.92)" : "rgba(26,26,26,0.95)",
        backdropFilter:       "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom:         "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Wordmark ── */}
          <Link href="/" className="flex items-center">
            <span
              style={{
                color:         "#f5f0eb",
                fontWeight:    800,
                fontSize:      "1.15rem",
                letterSpacing: "-0.02em",
              }}
            >
              HUB
            </span>
            <span
              style={{
                ...GRAD,
                fontWeight:    800,
                fontSize:      "1.15rem",
                letterSpacing: "-0.02em",
              }}
            >
              SS
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-0.5">

            {/* Products trigger */}
            <Link
              href="/products"
              className="flex items-center gap-1 text-[0.78rem] font-medium px-3 py-2 relative group transition-colors duration-150"
              style={{
                color: activePanel === "products" || pathname.startsWith("/products")
                  ? "#f5f0eb"
                  : "#6b7280",
              }}
              onMouseEnter={(e) => openPanel("products", e.currentTarget)}
              onMouseLeave={startCloseTimer}
              aria-expanded={activePanel === "products"}
              aria-haspopup="true"
            >
              Products
              <ChevronDown
                size={13}
                className="transition-transform duration-200"
                style={{ transform: activePanel === "products" ? "rotate(180deg)" : "rotate(0deg)" }}
              />
              <GradLine
                visible={
                  activePanel === "products" ||
                  pathname.startsWith("/products")
                }
              />
            </Link>

            {/* Applications trigger */}
            <Link
              href="/applications"
              className="flex items-center gap-1 text-[0.78rem] font-medium px-3 py-2 relative group transition-colors duration-150"
              style={{
                color: activePanel === "applications" || pathname.startsWith("/applications")
                  ? "#f5f0eb"
                  : "#6b7280",
              }}
              onMouseEnter={(e) => openPanel("applications", e.currentTarget)}
              onMouseLeave={startCloseTimer}
              aria-expanded={activePanel === "applications"}
              aria-haspopup="true"
            >
              Applications
              <ChevronDown
                size={13}
                className="transition-transform duration-200"
                style={{
                  transform: activePanel === "applications" ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
              <GradLine
                visible={
                  activePanel === "applications" ||
                  pathname.startsWith("/applications")
                }
              />
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
                  {/* Active underline — also shows on hover via group */}
                  <span
                    className="absolute bottom-0.5 left-3 right-3 h-px transition-all duration-200 group-hover:opacity-60"
                    style={{
                      background: "linear-gradient(90deg,#f97316,#eab308)",
                      opacity:    active ? 1 : 0,
                    }}
                  />
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

          {/* ── Mobile hamburger ── */}
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

      {/* ── Mobile menu ── */}
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
                onClick={() =>
                  setMobileExpanded(mobileExpanded === "products" ? null : "products")
                }
                aria-expanded={mobileExpanded === "products"}
              >
                Products
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200"
                  style={{ transform: mobileExpanded === "products" ? "rotate(180deg)" : "rotate(0deg)" }}
                />
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
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="block px-2 py-2 text-sm"
                        style={{ color: "#6b7280" }}
                      >
                        {p.name}
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      className="block px-2 py-2 text-xs font-semibold"
                      style={{ color: "#f97316" }}
                    >
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
                onClick={() =>
                  setMobileExpanded(mobileExpanded === "applications" ? null : "applications")
                }
                aria-expanded={mobileExpanded === "applications"}
              >
                Applications
                <ChevronDown
                  size={15}
                  className="transition-transform duration-200"
                  style={{
                    transform: mobileExpanded === "applications" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
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
                      <Link
                        key={app.slug}
                        href={`/applications/${app.slug}`}
                        className="block px-2 py-2 text-sm"
                        style={{ color: "#6b7280" }}
                      >
                        {app.name}
                      </Link>
                    ))}
                    <Link
                      href="/applications"
                      className="block px-2 py-2 text-xs font-semibold"
                      style={{ color: "#f97316" }}
                    >
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
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-2.5 text-sm font-medium"
                  style={{ color: active ? "#f97316" : "#9ca3af" }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-3 block text-sm font-bold px-5 py-3 rounded-full text-center transition-all hover:brightness-110"
              style={{ background: "linear-gradient(90deg,#F97316,#d97706)", color: "#fff" }}
            >
              Book Lunch &amp; Learn
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mega panels (mode="wait" ensures clean panel-to-panel transitions) ── */}
      <AnimatePresence mode="wait">
        {activePanel === "products" && (
          <ProductsPanel
            key="products"
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={startCloseTimer}
          />
        )}
        {activePanel === "applications" && (
          <ApplicationsPanel
            key="applications"
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={startCloseTimer}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
