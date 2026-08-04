import { Check, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteContent } from "@/lib/types";

type ProgramsProps = {
  programs: SiteContent["programs"];
  whatsappNumber: string;
};

export function Programs({ programs, whatsappNumber }: ProgramsProps) {
  return (
    <section id="programs" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={programs.eyebrow}
          heading={programs.heading}
          subheading={programs.subheading}
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {programs.items.map((program, index) => (
            <Reveal key={program.id} delay={index * 0.08}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-colors duration-300 ${
                  program.popular
                    ? "border-volt shadow-[0_0_60px_-24px_rgba(198,248,51,0.6)]"
                    : "border-line hover:border-volt/50"
                }`}
              >
                {program.popular ? (
                  <span className="absolute top-4 end-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-volt px-3 py-1.5 text-xs font-black text-ink">
                    <Star className="size-3.5 fill-ink" />
                    הכי פופולרי
                  </span>
                ) : null}

                <div className="relative overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    loading="lazy"
                    className="aspect-16/9 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-black">{program.name}</h3>
                  <p className="mt-1 text-sm font-medium text-volt">
                    {program.tagline}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-fog">
                    {program.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2 border-y border-line py-4">
                    <span className="text-3xl font-black">{program.price}</span>
                    <span className="text-sm text-fog">{program.period}</span>
                  </div>

                  <ul className="mt-5 flex-1 space-y-3">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-volt"
                          strokeWidth={3}
                        />
                        <span className="text-sm leading-snug text-chalk">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(
                      whatsappNumber,
                      `היי, אני מתעניין במסלול "${program.name}" שראיתי באתר. אפשר פרטים?`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass(
                      program.popular ? "volt" : "outline",
                      "lg",
                      "mt-7 w-full",
                    )}
                  >
                    מתעניין במסלול
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
