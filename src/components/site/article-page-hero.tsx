import { CalendarDays, Clock } from "lucide-react";
import type { Article, SiteContent } from "@/lib/types";

function isPlaceholderImage(src: string) {
  return src.includes("/placeholders/");
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

type ArticlePageHeroProps = {
  article: Article;
  articlesMeta: SiteContent["articles"];
};

export function ArticlePageHero({ article, articlesMeta }: ArticlePageHeroProps) {
  const showImage = Boolean(article.image) && !isPlaceholderImage(article.image);

  return (
    <header className="relative overflow-hidden border-b border-line bg-ink-soft">
      <div className="absolute inset-0 grid-bg opacity-35" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-volt/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -start-24 top-8 size-64 rounded-full bg-volt/6 blur-3xl"
        aria-hidden
      />

      <div className="shell relative max-w-3xl py-10 sm:py-14 lg:py-16">
        {articlesMeta.eyebrow ? (
          <p className="max-w-2xl text-sm leading-relaxed text-fog">{articlesMeta.eyebrow}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-3 py-1.5 text-xs text-chalk/80">
            <CalendarDays className="size-3.5 shrink-0 text-volt" />
            {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-volt/10 px-3 py-1.5 text-xs font-medium text-volt">
            <Clock className="size-3.5 shrink-0" />
            {article.readTime}
          </span>
          {articlesMeta.authorName ? (
            <span className="text-xs text-fog">{articlesMeta.authorName}</span>
          ) : null}
        </div>

        <h1 className="mt-6 text-3xl font-black leading-[1.15] text-chalk text-balance sm:mt-7 sm:text-4xl lg:text-[2.75rem]">
          {article.title}
        </h1>

        {showImage ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-line shadow-[0_24px_80px_-40px_rgba(198,248,51,0.25)]">
            <img
              src={article.image}
              alt=""
              className="aspect-16/9 w-full object-cover"
            />
          </div>
        ) : null}

        <p className="mt-8 border-s-2 border-volt ps-4 text-base leading-relaxed text-fog sm:ps-5 sm:text-lg">
          {article.excerpt}
        </p>
      </div>
    </header>
  );
}
