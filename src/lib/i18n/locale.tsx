"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/lib/types";
import { UI, type Locale, type UiCopy } from "./ui";

type LocaleContextValue = {
  locale: Locale;
  content: SiteContent;
  ui: UiCopy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  content: SiteContent;
  children: ReactNode;
};

export function LocaleProvider({ content, children }: LocaleProviderProps) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: "he",
      content,
      ui: UI.he,
    }),
    [content],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

const fallbackValue: LocaleContextValue = {
  locale: "he",
  content: {} as SiteContent,
  ui: UI.he,
};

export function useLocale() {
  return useContext(LocaleContext) ?? fallbackValue;
}
