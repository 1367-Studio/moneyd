import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Original MoneyDrops writing lives as Markdown files in /content:
//   content/guides/<slug>.md      evergreen explainers
//   content/briefings/<date>.md   the daily written briefing (e.g. 2026-11-02.md)
// Files starting with "_" (like _template.md) are ignored.

export type Kind = "guides" | "briefings";

export type Post = {
  kind: Kind;
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  author: string;
  category?: string;
  readingMinutes: number;
  html: string;
};

const ROOT = path.join(process.cwd(), "content");

function parse(kind: Kind, file: string): Post {
  const raw = fs.readFileSync(path.join(ROOT, kind, file), "utf8");
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  const front: Record<string, string> = {};
  const body = m ? m[2] : raw;
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const i = line.indexOf(":");
      if (i > 0) front[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  const slug = file.replace(/\.md$/, "");
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    kind,
    slug,
    title: front.title || slug,
    description: front.description || "",
    date: front.date || (kind === "briefings" ? slug : ""),
    updated: front.updated || undefined,
    author: front.author || "MoneyDrops",
    category: front.category || undefined,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html: marked.parse(body, { async: false }) as string,
  };
}

export function getPosts(kind: Kind): Post[] {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => parse(kind, f))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(kind: Kind, slug: string): Post | undefined {
  return getPosts(kind).find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
