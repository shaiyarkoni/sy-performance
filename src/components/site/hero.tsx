import { ArrowLeft, ChevronDown } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { buttonClass } from "@/components/ui/button";
import type { SiteContent } from "@/lib/types";

type HeroProps = {
  hero: SiteContent["hero"];
  whatsappHref: string;
};

export function Hero({ hero, whatsappHref }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28"
    >
      <img
        src={hero.image}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/80 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
      <div className="grid-bg absolute inset-0 opacity-70" />

      <div className="shell relative flex flex-1 flex-col justify-center py-16">
        <div className="flex items-center gap-3">
          <span className="stripes h-4 w-12 rounded-sm" />
          <span className="text-xs font-bold tracking-[0.2em] text-volt uppercase sm:text-sm">
            {hero.kicker}
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-black text-balance sm:text-6xl lg:text-7xl">
          {hero.title}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("volt", "lg")}
          >
            {hero.primaryCta}
            <ArrowLeft className="size-4" />
          </a>
          <a href="#programs" className={buttonClass("outline", "lg")}>
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      <div className="relative border-t border-line bg-ink/60 backdrop-blur-sm">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {hero.stats.map((stat) => (
            <div
              key={stat.id}
              className="border-s border-line px-1 py-6 text-center [&:nth-child(2n+1)]:border-s-0 lg:py-8 lg:[&:nth-child(2n+1)]:border-s lg:[&:nth-child(4n+1)]:border-s-0"
            >
              <div className="text-3xl font-black text-volt tabular-nums sm:text-4xl">
                <Counter value={stat.value} />
              </div>
              <div className="mt-1.5 text-xs text-fog sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="גלול למטה"
        className="absolute bottom-32 start-6 hidden animate-bounce text-fog transition-colors hover:text-volt lg:block"
      >
        <ChevronDown className="size-7" />
      </a>
    </section>
  );
}
