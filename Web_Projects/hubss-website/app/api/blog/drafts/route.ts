import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile, unlink } from "fs/promises";
import path from "path";
import matter from "gray-matter";

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

const DRAFTS_DIR = path.join(process.cwd(), "content", "blog", "drafts");

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let files: string[];
  try {
    files = (await readdir(DRAFTS_DIR)).filter((f) => f.endsWith(".mdx"));
  } catch {
    return NextResponse.json({ drafts: [] });
  }

  const drafts = await Promise.all(
    files.map(async (filename) => {
      const raw = await readFile(path.join(DRAFTS_DIR, filename), "utf8");
      const { data } = matter(raw);
      return {
        filename,
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title ?? filename,
        excerpt: data.excerpt ?? "",
        date: data.date ?? "",
        tags: data.tags ?? [],
      };
    })
  );

  return NextResponse.json({ drafts });
}

// DELETE /api/blog/drafts?filename=xxx.mdx — discard a draft
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filename = req.nextUrl.searchParams.get("filename");
  if (!filename || !filename.endsWith(".mdx") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  await unlink(path.join(DRAFTS_DIR, filename));
  return NextResponse.json({ ok: true });
}
