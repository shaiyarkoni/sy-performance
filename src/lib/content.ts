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

/** Promo fields from repo override blob for matching program ids. */
function mergeProgramPromos(
  content: SiteContent,
  promoSource: SiteContent["programs"]["items"],
): SiteContent {
  const promoById = new Map(
    promoSource.map((item) => [
      item.id,
      {
        originalPrice: item.originalPrice,
        price: item.price,
        promoLabel: item.promoLabel,
      },
    ]),
  );

  return {
    ...content,
    programs: {
      ...content.programs,
      items: content.programs.items.map((item) => {
        const promo = promoById.get(item.id);
        if (!promo?.originalPrice && !promo?.promoLabel) return item;

        return {
          ...item,
          originalPrice: promo.originalPrice,
          price: promo.price,
          promoLabel: promo.promoLabel,
        };
      }),
    },
  };
}

/** Certificate title/issuer from repo override blob for matching ids. */
function mergeCertificateText(
  content: SiteContent,
  fileContent: SiteContent,
): SiteContent {
  const fileById = new Map(
    fileContent.certificates.items.map((item) => [item.id, item]),
  );

  return {
    ...content,
    certificates: {
      ...content.certificates,
      items: content.certificates.items.map((item) => {
        const fileItem = fileById.get(item.id);
        if (!fileItem) return item;

        return {
          ...item,
          title: fileItem.title,
          issuer: fileItem.issuer,
        };
      }),
    },
  };
}

/** Repo overrides for hero stats, program promos, and certificate text (works even when Blob is stale). */
function mergeRepoOverrides(
  content: SiteContent,
  fileContent: SiteContent,
): SiteContent {
  return mergeCertificateText(
    mergeProgramPromos(
      {
        ...content,
        hero: {
          ...content.hero,
          stats: fileContent.hero.stats,
        },
      },
      fileContent.programs.items,
    ),
    fileContent,
  );
}

export async function getContent(): Promise<SiteContent> {
  const fileContent = await readFromFile();
  const fromBlob = await readFromBlob();
  const base = fromBlob ?? fileContent;
  return mergeRepoOverrides(base, fileContent);
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
