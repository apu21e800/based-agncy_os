import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { writeFile } from "fs/promises";
import path from "path";

function checkAuth(req: NextRequest): boolean {
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

const BLOG_TOPICS = [
  "How stamped asphalt crosswalks support Vision Zero initiatives in Canadian municipalities",
  "The Complete Streets framework: how surface markings define pedestrian safety",
  "Thermoplastic vs. epoxy pavement markings: durability, cost, and application guide",
  "Airport surface markings: FAA standards and the role of AirMark in Canadian airports",
  "Bus rapid transit lane markings: design principles and product selection",
  "Community identity through decorative crosswalks: case studies from BC and Ontario",
  "AODA compliance on municipal surfaces: ramps, detectable warnings, and colour contrast",
  "Parking lot design with DuraShield: sealcoat options, markings, and maintenance cycles",
  "Winter durability of pavement coatings in Canadian climates",
  "How municipalities can fund decorative surface projects through provincial grants",
];

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const topic: string =
    body.topic ||
    BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];

  const client = new Anthropic();

  const stream = client.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    thinking: { type: "adaptive" },
    system: `You are an expert content writer for HUB Surface Systems, a Canadian company specialising in decorative and functional pavement coatings for municipalities, developers, and contractors.

Brand voice: Technical authority with civic pride. Write in clear, professional Canadian English (use "colour", "centre", etc.). The target audience is municipal engineers, planners, and project managers.

Products: TrafficPatterns, TrafficPatternsXD, StreetPrint, StreetBond, MMAX, DecoMark, DuraShield, DuraTherm, PreMark, AirMark.

When you write a blog post, output it in MDX format with the following frontmatter fields:
- title
- excerpt (1–2 sentences, used in listings)
- date (today's date: ${new Date().toISOString().slice(0, 10)})
- author (use "HUB Surface Systems Editorial Team")
- tags (array of 3–5 relevant tags)
- coverImage (leave as "/images/blog/default.jpg")

After the frontmatter, write the full post body in Markdown. Target 600–900 words. Use ## and ### headings, bullet lists where appropriate, and reference relevant HUB products naturally. End with a CTA paragraph linking to /contact.`,
    messages: [
      {
        role: "user",
        content: `Write a blog post on the following topic:\n\n"${topic}"`,
      },
    ],
  });

  const message = await stream.finalMessage();

  // Extract the text block (skip thinking blocks)
  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return NextResponse.json(
      { error: "No text content in response" },
      { status: 500 }
    );
  }

  const mdx = textBlock.text.trim();

  // Derive a slug from the topic
  const slug =
    topic
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) +
    "-" +
    Date.now();

  const filename = `${slug}.mdx`;
  const draftsDir = path.join(process.cwd(), "content", "blog", "drafts");
  await writeFile(path.join(draftsDir, filename), mdx, "utf8");

  return NextResponse.json({ slug, filename, topic, preview: mdx.slice(0, 300) });
}
