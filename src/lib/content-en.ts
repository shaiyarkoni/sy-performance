import type { SiteContent } from "./types";
import contentEn from "../../data/content.en.json";

export function getEnglishContent(): SiteContent {
  return contentEn as SiteContent;
}
