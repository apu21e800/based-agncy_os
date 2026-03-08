"use client";

import { useState, useEffect, useCallback } from "react";

interface Draft {
  filename: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export default function AdminBlogPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const headers = { "x-admin-password": password, "Content-Type": "application/json" };

  const loadDrafts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog/drafts", { headers });
      if (res.status === 401) { setAuthed(false); return; }
      const data = await res.json();
      setDrafts(data.drafts ?? []);
    } catch {
      setError("Failed to load drafts.");
    } finally {
      setLoading(false);
    }
  }, [password]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthed(true);
  };

  useEffect(() => {
    if (authed) loadDrafts();
  }, [authed, loadDrafts]);

  async function generate() {
    setGenerating(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers,
        body: JSON.stringify(customTopic ? { topic: customTopic } : {}),
      });
      if (res.status === 401) { setAuthed(false); return; }
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Generation failed.");
        return;
      }
      const data = await res.json();
      setMessage(`Draft created: "${data.topic.slice(0, 60)}..."`);
      setCustomTopic("");
      await loadDrafts();
    } catch {
      setError("Network error.");
    } finally {
      setGenerating(false);
    }
  }

  async function approve(filename: string) {
    setError("");
    const res = await fetch("/api/blog/approve", {
      method: "POST",
      headers,
      body: JSON.stringify({ filename }),
    });
    if (!res.ok) { setError("Failed to approve."); return; }
    setMessage(`Published: ${filename}`);
    await loadDrafts();
  }

  async function discard(filename: string) {
    setError("");
    const res = await fetch(`/api/blog/drafts?filename=${encodeURIComponent(filename)}`, {
      method: "DELETE",
      headers,
    });
    if (!res.ok) { setError("Failed to discard."); return; }
    setMessage(`Discarded: ${filename}`);
    await loadDrafts();
  }

  if (!authed) {
    return (
      <main style={{ background: "#1a1a1a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form onSubmit={handleLogin} style={{ background: "#2d2d2d", border: "1px solid #333", borderRadius: "12px", padding: "40px", width: "320px" }}>
          <h1 style={{ color: "#f5f0eb", fontSize: "1.25rem", fontWeight: 700, marginBottom: "24px" }}>
            Blog Admin
          </h1>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", background: "#1a1a1a", border: "1px solid #444", borderRadius: "8px", padding: "12px", color: "#f5f0eb", fontSize: "0.875rem", marginBottom: "16px", boxSizing: "border-box" }}
          />
          <button
            type="submit"
            style={{ width: "100%", background: "#f97316", color: "#fff", fontWeight: 700, padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
          >
            Sign In
          </button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 style={{ color: "#f5f0eb", fontSize: "1.75rem", fontWeight: 800 }}>Blog Admin</h1>
          <button
            onClick={() => setAuthed(false)}
            style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem" }}
          >
            Sign out
          </button>
        </div>

        {/* Generate */}
        <div style={{ background: "#2d2d2d", border: "1px solid #333", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <h2 style={{ color: "#f5f0eb", fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>
            Generate New Post
          </h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Custom topic (leave blank for random)"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              style={{ flex: 1, background: "#1a1a1a", border: "1px solid #444", borderRadius: "8px", padding: "10px 14px", color: "#f5f0eb", fontSize: "0.875rem" }}
            />
            <button
              onClick={generate}
              disabled={generating}
              style={{ background: generating ? "#555" : "#f97316", color: "#fff", fontWeight: 700, padding: "10px 20px", borderRadius: "8px", border: "none", cursor: generating ? "not-allowed" : "pointer", fontSize: "0.875rem", whiteSpace: "nowrap" }}
            >
              {generating ? "Generating…" : "Generate"}
            </button>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "8px" }}>
            Uses Claude Opus 4.6 with adaptive thinking. Takes ~20–40 seconds.
          </p>
        </div>

        {message && (
          <div style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#f97316", fontSize: "0.875rem" }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", color: "#ef4444", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {/* Drafts */}
        <h2 style={{ color: "#f5f0eb", fontSize: "1rem", fontWeight: 700, marginBottom: "16px" }}>
          Drafts ({loading ? "…" : drafts.length})
        </h2>

        {!loading && drafts.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>No drafts. Generate one above.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {drafts.map((draft) => (
            <div
              key={draft.filename}
              style={{ background: "#2d2d2d", border: "1px solid #333", borderRadius: "10px", padding: "20px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#f5f0eb", fontWeight: 700, fontSize: "0.9375rem", marginBottom: "4px" }}>
                    {draft.title || draft.slug}
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "0.8125rem", marginBottom: "8px" }}>{draft.excerpt}</p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {draft.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{ background: "rgba(249,115,22,0.12)", color: "#f97316", fontSize: "0.6875rem", fontWeight: 600, padding: "2px 8px", borderRadius: "999px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  <button
                    onClick={() => approve(draft.filename)}
                    style={{ background: "#16a34a", color: "#fff", fontWeight: 700, padding: "8px 16px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "0.8125rem" }}
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => discard(draft.filename)}
                    style={{ background: "#2d2d2d", color: "#9ca3af", fontWeight: 600, padding: "8px 16px", borderRadius: "8px", border: "1px solid #444", cursor: "pointer", fontSize: "0.8125rem" }}
                  >
                    Discard
                  </button>
                </div>
              </div>
              <p style={{ color: "#555", fontSize: "0.6875rem", marginTop: "10px", fontFamily: "monospace" }}>
                {draft.filename}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
