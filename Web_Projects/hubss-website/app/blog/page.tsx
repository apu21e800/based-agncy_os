import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#f97316" }}>Insights</p>
          <h1 className="text-6xl font-bold" style={{ color: "#f5f0eb" }}>Blog</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-8 rounded-xl transition-colors"
              style={{ background: "#2d2d2d", border: "1px solid #333" }}
            >
              <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>
                {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                {" \u00b7 "}{post.readTime}
              </p>
              <h2 className="font-bold text-lg leading-snug mb-3 group-hover:text-[#f97316] transition-colors" style={{ color: "#f5f0eb" }}>
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
                {post.excerpt}
              </p>
              <p className="text-xs font-semibold mt-5" style={{ color: "#f97316" }}>Read more &rarr;</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
