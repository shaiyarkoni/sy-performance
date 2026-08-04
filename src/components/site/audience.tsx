import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/types";

export function Audience({
  audience,
}: {
  audience: SiteContent["audience"];
}) {
  return (
    <section id="audience" className="section relative bg-ink-soft">
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={audience.eyebrow}
          heading={audience.heading}
          subheading={audience.subheading}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {audience.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.07}>
              <article className="group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-volt/60">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
