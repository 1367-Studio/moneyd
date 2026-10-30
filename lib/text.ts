// Feed text arrives with HTML tags and entities (e.g. "<ul><li>", "BMO&apos;s").
// Everything shown on the site goes through clean() first.

const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  euro: "€", pound: "£", yen: "¥", cent: "¢", copy: "©", reg: "®", trade: "™",
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n < 0x110000 ? String.fromCodePoint(n) : m;
    }
    return NAMED[code.toLowerCase()] ?? m;
  });
}

export function stripTags(s: string): string {
  return s
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|li|h\d|div)>|<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "");
}

export function clean(s: string | null | undefined): string {
  if (!s) return "";
  // Decode once, strip tags (some feeds escape their tags), decode again for double-encoded text.
  return decodeEntities(stripTags(decodeEntities(stripTags(s))))
    .replace(/\s+/g, " ")
    .trim();
}

// Feeds sometimes ship a publisher's full article as the "summary". We only ever show a short
// excerpt and link to the original for the rest.
export function excerpt(s: string, max = 280): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (sentenceEnd > max * 0.5) return cut.slice(0, sentenceEnd + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–—]$/, "") + "…";
}
