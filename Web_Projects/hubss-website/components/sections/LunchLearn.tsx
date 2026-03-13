"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const benefits = [
  "Free CPD/PDH credits for engineers",
  "Live product demonstrations",
  "Case studies from Canadian municipalities",
  "Lunch provided at your office or virtually",
];

export default function LunchLearn() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <section
      id="lunch-learn"
      className="py-24 relative overflow-hidden"
      style={{ background: "#111111" }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: "#f97316" }}
            >
              Free Professional Development
            </p>
            <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: "#f5f0eb" }}>
              Join us for{" "}
              <span style={{ color: "#f97316", fontStyle: "italic" }}>lunch</span>
              <br />
              &amp; learn
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#e5e7eb" }}>
              Complimentary sessions for municipalities, engineering firms, and
              contractors. Discover the latest in decorative pavement technology,
              Vision Zero solutions, and Complete Streets applications.
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((item) => (
                <li key={item} className="flex items-center gap-3" style={{ color: "#d1d5db" }}>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(249,115,22,0.2)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#f97316" }} />
                  </span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            {/* SkipTheDishes placeholder */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded"
              style={{ background: "#2d2d2d", border: "1px solid #333" }}
            >
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                style={{ background: "#f97316", color: "#fff" }}
              >
                SD
              </div>
              <span className="text-xs" style={{ color: "#d1d5db" }}>
                Delivered by SkipTheDishes
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl p-8"
            style={{ background: "#2d2d2d", border: "1px solid #333" }}
          >
            {submitted ? (
              <div className="text-center py-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(249,115,22,0.15)" }}
                >
                  <svg className="w-7 h-7" style={{ color: "#f97316" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#f5f0eb" }}>Request Received!</h3>
                <p className="text-sm" style={{ color: "#d1d5db" }}>
                  We&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-6" style={{ color: "#f5f0eb" }}>
                  Book Your Session
                </h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setError("");
                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...form, formType: "lunch-learn", website: "" }),
                      });
                      const data = await res.json();
                      if (!res.ok || data.error) {
                        setError(data.error ?? "Something went wrong. Please try again.");
                      } else {
                        setSubmitted(true);
                      }
                    } catch {
                      setError("Network error. Please try again.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="space-y-4"
                >
                  {[
                    { label: "Full Name", key: "name", type: "text", placeholder: "Jane Smith" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "jane@city.ca" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "416-555-0100" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm mb-2" style={{ color: "#d1d5db" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.key !== "phone"}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all focus:ring-1 focus:ring-orange-500"
                        style={{
                          background: "#1a1a1a",
                          border: "1px solid #333",
                          color: "#f5f0eb",
                        }}
                      />
                    </div>
                  ))}
                  {/* Honeypot */}
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
                    className="w-full font-semibold py-4 rounded-lg transition-all text-sm mt-2 disabled:opacity-60"
                    style={{ background: "#f97316", color: "#fff" }}
                  >
                    {loading ? "Sending..." : "Register for Lunch & Learn"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
