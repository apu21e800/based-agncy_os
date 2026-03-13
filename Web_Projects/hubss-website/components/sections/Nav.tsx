"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "rgba(26,26,26,0.95)",
        borderBottom: "1px solid #2a2a2a",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="font-extrabold text-xl tracking-tight"
              style={{ color: "#f5f0eb", letterSpacing: "-0.02em" }}
            >
              HUB
            </span>
            <span
              className="w-px h-5 self-center"
              style={{ background: "#f97316", opacity: 0.7 }}
            />
            <span
              className="font-light text-xl tracking-[0.15em]"
              style={{ color: "#f97316" }}
            >
              SS
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium relative pb-0.5 group"
                  style={{ color: active ? "#f97316" : "#9ca3af" }}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px transition-all duration-200 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    style={{ background: "#f97316" }}
                  />
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="text-sm font-semibold px-5 py-2 rounded-full transition-all hover:brightness-110"
              style={{ background: "#f97316", color: "#fff" }}
            >
              Book Lunch &amp; Learn
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{ color: "#f5f0eb" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden pb-5 flex flex-col gap-1"
            style={{ borderTop: "1px solid #2a2a2a", paddingTop: "16px" }}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium px-2 py-2.5 rounded transition-colors"
                  style={{ color: active ? "#f97316" : "#9ca3af" }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="text-sm font-semibold px-5 py-3 rounded-full text-center mt-2"
              style={{ background: "#f97316", color: "#fff" }}
            >
              Book Lunch &amp; Learn
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
