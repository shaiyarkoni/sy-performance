/** Split article body into lines/blocks (same rules as the article page renderer). */
export function articleBodyBlocks(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const PREVIEW_LINE_FALLBACK = 22;

/**
 * Public preview only. Text after a lone `---` line is never sent to the page.
 * Without `---`, only the first PREVIEW_LINE_FALLBACK lines are shown when the body is longer.
 */
export function getArticlePublicPreview(body: string): {
  blocks: string[];
  hasMore: boolean;
} {
  const raw = body.trim();
  if (!raw) return { blocks: [], hasMore: false };

  const delimiter = /\n---\n/;
  if (delimiter.test(raw)) {
    const [previewPart] = raw.split(delimiter);
    const blocks = articleBodyBlocks(previewPart ?? "");
    return { blocks, hasMore: true };
  }

  const all = articleBodyBlocks(raw);
  if (all.length <= PREVIEW_LINE_FALLBACK) {
    return { blocks: all, hasMore: false };
  }
  return {
    blocks: all.slice(0, PREVIEW_LINE_FALLBACK),
    hasMore: true,
  };
}

export function whatsappFullArticleMessage(title: string): string {
  return [
    "היי שי,",
    `קראתי את ההתחלה של המאמר "${title}" באתר.`,
    "אשמח לקבל את המאמר המלא.",
    "תודה!",
  ].join("\n");
}
