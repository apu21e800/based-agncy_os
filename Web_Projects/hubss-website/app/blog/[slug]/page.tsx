import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { getAllPosts, getPost } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <main style={{ background: "#1a1a1a", minHeight: "100vh" }}>
      <Nav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="mb-10">
          <Link href="/blog" className="text-xs font-semibold tracking-widest uppercase mb-6 block transition-colors hover:text-[#f97316]" style={{ color: "#9ca3af" }}>
            &larr; Back to Blog
          </Link>
          <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>
            {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
            {" \u00b7 "}{post.readTime}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#f5f0eb" }}>
            {post.title}
          </h1>
        </div>

        <div
          className="prose max-w-none"
          style={{
            color: "#9ca3af",
            lineHeight: "1.8",
          }}
        >
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-16 pt-10" style={{ borderTop: "1px solid #333" }}>
          <Link
            href="/contact"
            className="inline-block font-semibold px-8 py-4 rounded text-sm"
            style={{ background: "#f97316", color: "#fff" }}
          >
            Request Spec Sheet
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
