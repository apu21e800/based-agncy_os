import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

const DRAFTS_DIR = path.join(process.cwd(), "content", "blog", "drafts");
const PUBLISHED_DIR = path.join(process.cwd(), "content", "blog");

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { filename } = body as { filename?: string };

  if (!filename || !filename.endsWith(".mdx") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const draftPath = path.join(DRAFTS_DIR, filename);
  const content = await readFile(draftPath, "utf8");

  await mkdir(PUBLISHED_DIR, { recursive: true });
  await writeFile(path.join(PUBLISHED_DIR, filename), content, "utf8");
  await unlink(draftPath);

  return NextResponse.json({ ok: true, published: filename });
}
