"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { writeContent } from "@/lib/content";
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

export async function saveContent(content: SiteContent) {
  // Server Actions are reachable directly, so the session is re-checked here and not only in the proxy.
  if (!(await isAuthenticated())) {
    return { ok: false as const, error: "פג תוקף ההתחברות. רענן והתחבר מחדש." };
  }

  try {
    await writeContent(content);
    revalidatePath("/", "layout");
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "שמירת הקובץ נכשלה." };
  }
}
