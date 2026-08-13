import { promises as fs } from "node:fs";
import path from "node:path";
import { get, put } from "@vercel/blob";
import type { SiteContent } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");
const BLOB_PATHNAME = "site-content.json";

function useBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readFromBlob(): Promise<SiteContent | null> {
  if (!useBlobStorage()) return null;

  try {
    const result = await get(BLOB_PATHNAME, { access: "private" });
    if (!result) return null;

    const text = await new Response(result.stream).text();
    return JSON.parse(text) as SiteContent;
  } catch {
    return null;
  }
}

async function writeToBlob(content: SiteContent): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

async function readFromFile(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function getContent(): Promise<SiteContent> {
  const fromBlob = await readFromBlob();
  if (fromBlob) return fromBlob;
  return readFromFile();
}

export async function writeContent(content: SiteContent): Promise<void> {
  if (useBlobStorage()) {
    await writeToBlob(content);
    return;
  }

  try {
    await fs.writeFile(
      CONTENT_PATH,
      `${JSON.stringify(content, null, 2)}\n`,
      "utf8",
    );
  } catch (error) {
    if (process.env.VERCEL) {
      throw new Error(
        "BLOB_REQUIRED: חבר Blob Store ב-Vercel (Storage → Blob) כדי לשמור מה-admin.",
        { cause: error },
      );
    }
    throw error;
  }
}
