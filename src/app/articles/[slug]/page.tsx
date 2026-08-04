import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { Footer } from "@/components/site/footer";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { buttonClass } from "@/components/ui/button";
import { getContent } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export async function generateStaticParams() {
  const content = await getContent();
  return content.articles.items.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  props: PageProps<"/articles/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const content = await getContent();
  const article = content.articles.items.find((item) => item.slug === slug);

  if (!article) return { title: "המאמר לא נמצא" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
  };
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage(
  props: PageProps<"/articles/[slug]">,
) {
  const { slug } = await props.params;
  const content = await getContent();
  const article = content.articles.items.find((item) => item.slug === slug);

  if (!article) notFound();

  const blocks = article.body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const whatsappHref = whatsappLink(
    content.contact.whatsappNumber,
    `היי שי, קראתי את המאמר "${article.title}" ואשמח לדבר.`,
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="shell flex h-18 items-center justify-between py-4">
          <Link href="/">
            <Brand />
          </Link>
          <Link
            href="/#article"
            className="inline-flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-volt"
          >
            חזרה לאתר
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <article>
          <div className="relative">
            <img
              src={article.image}
              alt=""
              aria-hidden
              className="h-72 w-full object-cover opacity-45 sm:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          </div>

          <div className="shell -mt-32 max-w-3xl">
            <div className="flex flex-wrap items-center gap-4 text-xs text-fog">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-black text-balance sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 border-s-2 border-volt ps-5 text-lg leading-relaxed text-fog">
              {article.excerpt}
            </p>

            <div className="mt-10 space-y-5 pb-16">
              {blocks.map((block, index) =>
                block.endsWith(":") ? (
                  <h2
                    key={index}
                    className="pt-5 text-xl font-black text-volt sm:text-2xl"
                  >
                    {block.slice(0, -1)}
                  </h2>
                ) : (
                  <p key={index} className="text-lg leading-relaxed text-chalk">
                    {block}
                  </p>
                ),
              )}
            </div>

            <div className="mb-20 rounded-2xl border border-line bg-surface p-7 text-center">
              <h2 className="text-xl font-black">
                רוצה לדבר על זה מול המצב שלך?
              </h2>
              <p className="mt-2 text-fog">
                שלח לי הודעה ונראה מה מתאים לך ולענף שלך.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("volt", "lg", "mt-6")}
              >
                דברו איתי בוואטסאפ
              </a>
            </div>
          </div>
        </article>
      </main>

      <Footer content={content} />
      <WhatsappFab href={whatsappHref} />
    </>
  );
}
