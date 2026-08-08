import { Shield } from "lucide-react";

export function ArticleCopyrightNotice({ text }: { text: string }) {
  if (!text.trim()) return null;

  return (
    <aside
      className="flex gap-3 rounded-xl border border-line bg-surface/80 px-4 py-3 text-sm leading-relaxed text-fog"
      aria-label="זכויות יוצרים"
    >
      <Shield className="mt-0.5 size-4 shrink-0 text-volt" aria-hidden />
      <p>{text}</p>
    </aside>
  );
}
