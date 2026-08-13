"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/lib/types";
import { LOCALE_STORAGE_KEY, UI, type Locale, type UiCopy } from "./ui";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: SiteContent;
  ui: UiCopy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  contentHe: SiteContent;
  contentEn: SiteContent;
  children: ReactNode;
};

export function LocaleProvider({
  contentHe,
  contentEn,
  children,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>("he");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "he" || stored === "en") {
      setLocaleState(stored);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "he" ? "he" : "en";
    document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale, ready]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
  };

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      content: locale === "he" ? contentHe : contentEn,
      ui: UI[locale],
    }),
    [locale, contentHe, contentEn],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

const fallbackValue: LocaleContextValue = {
  locale: "he",
  setLocale: () => {},
  content: {} as SiteContent,
  ui: UI.he,
};

export function useLocale() {
  return useContext(LocaleContext) ?? fallbackValue;
}
