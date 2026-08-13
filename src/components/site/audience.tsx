"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/types";

function AudienceCard({
  item,
  index,
  className = "",
}: {
  item: SiteContent["audience"]["items"][number];
  index: number;
  className?: string;
}) {
  return (
    <article
      className={`group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-volt/60 ${className}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        <span className="absolute top-4 start-4 grid size-9 place-items-center rounded-full bg-volt text-sm font-black text-ink">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-black transition-colors group-hover:text-volt">
          {item.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-fog">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function Audience({
  audience,
}: {
  audience: SiteContent["audience"];
}) {
  return (
    <section id="audience" className="section relative overflow-hidden bg-ink-soft">
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={audience.eyebrow}
          heading={audience.heading}
          subheading={audience.subheading}
        />
      </div>

      <Reveal>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:hidden">
          {audience.items.map((item, index) => (
            <AudienceCard
              key={item.id}
              item={item}
              index={index}
              className="w-[84vw] shrink-0 snap-start sm:w-[20rem]"
            />
          ))}
        </div>
        <p className="mt-3 px-5 text-center text-xs text-fog md:hidden">
          החלק ימינה ושמאלה לעוד קטגוריות
        </p>
      </Reveal>

      <div className="shell relative hidden gap-5 md:mt-12 md:grid md:grid-cols-2 xl:grid-cols-4">
        {audience.items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.07}>
            <AudienceCard item={item} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
