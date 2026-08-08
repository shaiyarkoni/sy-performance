import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import type { SiteContent } from "@/lib/types";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleTeaser({
  articles,
}: {
  articles: SiteContent["articles"];
}) {
  const [featured, ...rest] = articles.items;
  if (!featured) return null;

  return (
    <section id="article" className="section scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow={articles.eyebrow}
          heading={articles.heading}
          subheading={articles.subheading}
        />

        <Reveal className="mt-12">
          <article className="group grid overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-volt/50 lg:grid-cols-2">
            <div className="relative overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="h-full min-h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-surface/70 to-transparent lg:bg-gradient-to-l" />
            </div>

            <div className="relative z-10 flex flex-col justify-center bg-surface p-7 lg:p-10">
              <div className="flex flex-wrap items-center gap-4 text-xs text-chalk/65">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  {formatDate(featured.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {featured.readTime}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-black leading-snug text-chalk text-balance transition-colors group-hover:text-volt sm:text-3xl">
                {featured.title}
              </h3>

              <p className="mt-4 leading-relaxed text-fog">
                {featured.excerpt}
              </p>

              <Link
                href={`/articles/${featured.slug}`}
                className={buttonClass("volt", "lg", "mt-8 self-start")}
              >
                מעבר למאמר מלא
                <ArrowLeft className="size-4" />
              </Link>
              <p className="mt-3 text-xs text-fog">
                הצצה באתר · המשך בוואטסאפ
              </p>
            </div>
          </article>
        </Reveal>

        {rest.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, index) => (
              <Reveal key={article.id} delay={index * 0.07}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-volt/50"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="aspect-16/9 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="text-xs text-fog">
                      {formatDate(article.date)} · {article.readTime}
                    </div>
                    <h3 className="mt-2 text-lg leading-snug font-black text-chalk transition-colors group-hover:text-volt">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fog">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
