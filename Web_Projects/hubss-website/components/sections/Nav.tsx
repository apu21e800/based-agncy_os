"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(26,26,26,0.95)", borderBottom: "1px solid #333" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="font-bold text-xl tracking-wide" style={{ color: "#f5f0eb" }}>HUB</span>
            <span className="font-bold text-xl" style={{ color: "#f97316" }}>SS</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium relative pb-0.5 transition-colors"
                  style={{ color: active ? "#f97316" : "#9ca3af" }}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: "#f97316" }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/#lunch-learn"
              className="text-sm font-semibold px-4 py-2 rounded transition-colors"
              style={{ background: "#f97316", color: "#fff" }}
            >
              Book Lunch &amp; Learn
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            style={{ color: "#f5f0eb" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
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

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-4" style={{ borderTop: "1px solid #333", paddingTop: "1rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "#9ca3af" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#lunch-learn"
              className="text-sm font-semibold px-4 py-3 rounded text-center"
              style={{ background: "#f97316", color: "#fff" }}
              onClick={() => setOpen(false)}
            >
              Book Lunch &amp; Learn
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
