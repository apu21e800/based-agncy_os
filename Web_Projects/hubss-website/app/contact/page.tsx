"use client";

import { useState } from "react";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

// Note: metadata must be in a server component — defined in layout or a parallel route.
// Page-level metadata for client components requires moving meta to a parent layout.

const projectTypes = [
  "Crosswalk / Pedestrian Safety",
  "Bus & Bike Lane Markings",
  "Decorative Pavement / StreetPrint",
  "Regulatory / Road Markings",
  "Community / Public Art",
  "Parking Lot",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", projectType: "", message: ""
  });

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <div className="pt-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#f97316" }}>Get In Touch</p>
            <h1 className="text-5xl font-bold mb-8 leading-tight" style={{ color: "#f5f0eb" }}>
              Let&apos;s Build<br />Something.
            </h1>
            <p className="text-[16px] leading-relaxed mb-12" style={{ color: "#e5e7eb" }}>
              Whether you&apos;re a municipality planning a crosswalk program, a developer
              looking to enhance a property entrance, or a contractor seeking a product
              partner — we&apos;re here to help.
            </p>
            <div className="space-y-8">
              {[
                { region: "East Office", city: "Milton, Ontario", email: "doug.bain@hubss.com", phone: "416-540-9287" },
                { region: "West Office", city: "Ladysmith, BC", email: "cleve.stordy@hubss.com", phone: "604-309-8212" },
              ].map((office) => (
                <div key={office.region}>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#f97316" }}>{office.region}</p>
                  <p className="text-sm font-medium mb-2" style={{ color: "#f5f0eb" }}>{office.city}</p>
                  <a href={`mailto:${office.email}`} className="text-sm block mb-1 transition-colors hover:text-[#f97316]" style={{ color: "#d1d5db" }}>{office.email}</a>
                  <a href={`tel:${office.phone.replace(/-/g, "")}`} className="text-sm transition-colors hover:text-[#f97316]" style={{ color: "#d1d5db" }}>{office.phone}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-xl p-10" style={{ background: "#2d2d2d", border: "1px solid #333" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(249,115,22,0.15)" }}>
                  <svg className="w-7 h-7" style={{ color: "#f97316" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#f5f0eb" }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: "#d1d5db" }}>We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);
                  setError("");
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...form, formType: "contact", website: "" }),
                    });
                    const data = await res.json();
                    if (!res.ok || data.error) {
                      setError(data.error ?? "Something went wrong. Please try again.");
                    } else {
                      setSubmitted(true);
                    }
                  } catch {
                    setError("Network error. Please check your connection and try again.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", key: "name", type: "text", placeholder: "Jane Smith" },
                    { label: "Company", key: "company", type: "text", placeholder: "City of Toronto" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-sm mb-2" style={{ color: "#d1d5db" }}>{f.label}</label>
                      <input
                        type={f.type}
                        required
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500"
                        style={{ background: "#1a1a1a", border: "1px solid #333", color: "#f5f0eb" }}
                      />
                    </div>
                  ))}
                </div>
                {[
                  { label: "Email", key: "email", type: "email", placeholder: "jane@city.ca" },
                  { label: "Phone", key: "phone", type: "tel", placeholder: "416-555-0100" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm mb-2" style={{ color: "#d1d5db" }}>{f.label}</label>
                    <input
                      type={f.type}
                      required={f.key === "email"}
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500"
                      style={{ background: "#1a1a1a", border: "1px solid #333", color: "#f5f0eb" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#d1d5db" }}>Project Type</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-orange-500"
                    style={{ background: "#1a1a1a", border: "1px solid #333", color: "#f5f0eb" }}
                  >
                    <option value="">Select project type...</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#d1d5db" }}>Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none focus:ring-1 focus:ring-orange-500"
                    style={{ background: "#1a1a1a", border: "1px solid #333", color: "#f5f0eb" }}
                  />
                </div>
                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-semibold py-4 rounded-lg text-sm transition-all disabled:opacity-60"
                  style={{ background: "#f97316", color: "#fff" }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
