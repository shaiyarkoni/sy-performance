import type { Metadata } from "next";
import { ContentEditor } from "@/components/admin/content-editor";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "ניהול האתר",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const content = await getContent();
  return <ContentEditor initial={content} />;
}
