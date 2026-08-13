"use client";

import { useLocale } from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/ui";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line bg-ink/80 p-0.5 text-[11px] font-bold backdrop-blur-sm sm:text-xs ${className}`}
      role="group"
      aria-label="Language"
    >
      {(["he", "en"] as Locale[]).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`min-w-[2.25rem] rounded-full px-2 py-1 transition-colors sm:min-w-[2.5rem] sm:px-2.5 sm:py-1.5 ${
              active
                ? "bg-volt text-ink"
                : "text-fog hover:text-chalk"
            }`}
          >
            {code === "he" ? "עב" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
