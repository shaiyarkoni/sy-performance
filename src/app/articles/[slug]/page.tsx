import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { ArticleBodyContent } from "@/components/site/article-body-content";
import { ArticleCopyrightNotice } from "@/components/site/article-copyright-notice";
import { Footer } from "@/components/site/footer";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { buttonClass } from "@/components/ui/button";
import {
  getArticlePublicPreview,
  whatsappFullArticleMessage,
} from "@/lib/article-preview";
import { getContent } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/site/social-icons";

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
    robots: {
      index: true,
      follow: true,
      noarchive: true,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: content.articles.authorName
        ? [content.articles.authorName]
        : undefined,
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

  const { blocks, hasMore } = getArticlePublicPreview(article.body);

  const whatsappContinueHref = whatsappLink(
    content.contact.whatsappNumber,
    whatsappFullArticleMessage(article.title),
  );

  const whatsappHref = whatsappContinueHref;

  const copyrightNotice = content.articles.copyrightNotice;
  const authorName = content.articles.authorName;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: authorName
      ? { "@type": "Person", name: authorName }
      : undefined,
    copyrightNotice: copyrightNotice || undefined,
    inLanguage: "he",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

            <div className="mt-8">
              <ArticleCopyrightNotice text={copyrightNotice} />
            </div>

            <div className="article-body relative mt-10 space-y-5 pb-4">
              <ArticleBodyContent blocks={blocks} />
              {hasMore ? (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink via-ink/90 to-transparent"
                  aria-hidden
                />
              ) : null}
            </div>

            {hasMore ? (
              <div className="mb-16 rounded-2xl border border-volt/45 bg-volt/5 p-7 text-center sm:p-9">
                <p className="mx-auto max-w-md leading-relaxed text-fog">
                  זו ההצצה לפרק. לקריאת המאמר המלא — שלח הודעה בוואטסאפ ואשלח לך
                  את המשך.
                </p>
                <a
                  href={whatsappContinueHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass("volt", "lg", "mt-6 inline-flex")}
                >
                  <WhatsappIcon className="size-5" />
                  מעבר למאמר מלא
                </a>
              </div>
            ) : null}

            <div className="pb-16">
              <ArticleCopyrightNotice text={copyrightNotice} />
            </div>
          </div>
        </article>
      </main>

      <Footer content={content} />
      <WhatsappFab href={whatsappHref} />
    </>
  );
}
