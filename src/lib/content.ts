import { promises as fs } from "node:fs";
import path from "node:path";
import type { SiteContent } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

export async function getContent(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function writeContent(content: SiteContent): Promise<void> {
  await fs.writeFile(
    CONTENT_PATH,
    `${JSON.stringify(content, null, 2)}\n`,
    "utf8",
  );
}
