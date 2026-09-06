import { HomePage } from "@/components/site/home-page";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();

  return <HomePage content={content} />;
}
