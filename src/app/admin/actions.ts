"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { writeContent } from "@/lib/content";
import { normalizeWhatsAppNumber } from "@/lib/whatsapp";
import { endSession, isAuthenticated, startSession } from "@/lib/session";
import type { SiteContent } from "@/lib/types";

export type LoginState = { error?: string };

/** Compares digests so the check takes the same time regardless of where the strings diverge. */
function matches(candidate: string, expected: string) {
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return { error: "ADMIN_PASSWORD לא מוגדר בקובץ .env.local" };
  }

  const password = String(formData.get("password") ?? "");

  if (!password || !matches(password, expected)) {
    return { error: "סיסמה שגויה. נסה שוב." };
  }

  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

function sanitizeContent(content: SiteContent): SiteContent {
  const whatsappNumber = normalizeWhatsAppNumber(content.contact.whatsappNumber);
  const phoneDisplay = content.contact.phoneDisplay
    .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
    .trim();

  return {
    ...content,
    contact: {
      ...content.contact,
      whatsappNumber,
      phoneDisplay: phoneDisplay || whatsappNumber.replace(/^972/, "0"),
    },
  };
}

export async function saveContent(content: SiteContent) {
  // Server Actions are reachable directly, so the session is re-checked here and not only in the proxy.
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "פג תוקף ההתחברות. רענן והתחבר מחדש." };
  }

  const payload = sanitizeContent(content);

  try {
    await writeContent(payload);
    revalidatePath("/", "layout");
    return { ok: true as const };
  } catch (error) {
    const message =
      error instanceof Error && error.message.startsWith("BLOB_REQUIRED")
        ? "ב-Vercel צריך Blob Store: Project → Storage → Create → Blob → Connect. אחרי זה Redeploy ונסה שוב."
        : "שמירת הקובץ נכשלה.";
    return { ok: false as const, error: message };
  }
}
