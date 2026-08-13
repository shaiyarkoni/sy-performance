import { HomePage } from "@/components/site/home-page";
import { getContent } from "@/lib/content";
import { getEnglishContent } from "@/lib/content-en";

export default async function Home() {
  const contentHe = await getContent();
  const contentEn = getEnglishContent();

  return <HomePage contentHe={contentHe} contentEn={contentEn} />;
}
