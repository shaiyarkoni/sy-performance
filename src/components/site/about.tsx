import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/types";

export function About({ about }: { about: SiteContent["about"] }) {
  const paragraphs = about.bio.split("\n").filter((line) => line.trim());

  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl border border-accent-cool/25" />
          <div className="relative overflow-hidden rounded-2xl bg-surface">
            <img
              src={about.image}
              alt={about.name}
              loading="lazy"
              className="aspect-3/4 w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-6 pt-20">
              <div className="text-xl font-black">{about.name}</div>
              <div className="mt-1 text-sm text-accent-cool">{about.role}</div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-accent-cool" />
              <span className="text-sm font-bold tracking-[0.18em] text-accent-cool uppercase sm:text-base">
                {about.eyebrow}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-black text-balance sm:text-4xl lg:text-5xl">
              {about.heading}
            </h2>
          </Reveal>

          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.05 * index}>
                <p className="leading-relaxed text-fog">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 rounded-xl border border-line bg-surface/60 p-3.5"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-volt">
                    <Check className="size-3.5 text-ink" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-snug text-chalk">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
