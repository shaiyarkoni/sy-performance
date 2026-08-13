"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Certificate, SiteContent } from "@/lib/types";

export function Certificates({
  certificates,
}: {
  certificates: SiteContent["certificates"];
}) {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="section relative overflow-hidden bg-ink-soft">
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={certificates.eyebrow}
          heading={certificates.heading}
          subheading={certificates.subheading}
        />
      </div>

      <Reveal>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:hidden">
          {certificates.items.map((certificate) => (
            <button
              key={certificate.id}
              type="button"
              onClick={() => setActive(certificate)}
              className="group block w-[84vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-surface text-start transition-colors duration-300 hover:border-volt/60 sm:w-[20rem]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="size-7 text-volt" />
                </div>
                <span className="absolute top-3 end-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold text-volt backdrop-blur-sm">
                  {certificate.year}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base leading-snug font-black transition-colors group-hover:text-volt">
                  {certificate.title}
                </h3>
                <p className="mt-1.5 text-sm text-fog">{certificate.issuer}</p>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-3 px-5 text-center text-xs text-fog md:hidden">
          החלק ימינה ושמאלה לעוד תעודות
        </p>
      </Reveal>

      <div className="shell relative hidden gap-5 md:mt-12 md:grid md:grid-cols-2 xl:grid-cols-4">
        {certificates.items.map((certificate, index) => (
          <Reveal key={certificate.id} delay={index * 0.07}>
            <button
              type="button"
              onClick={() => setActive(certificate)}
              className="group block h-full w-full overflow-hidden rounded-2xl border border-line bg-surface text-start transition-colors duration-300 hover:border-volt/60"
            >
              <div className="relative overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="size-7 text-volt" />
                </div>
                <span className="absolute top-3 end-3 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold text-volt backdrop-blur-sm">
                  {certificate.year}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base leading-snug font-black transition-colors group-hover:text-volt">
                  {certificate.title}
                </h3>
                <p className="mt-1.5 text-sm text-fog">{certificate.issuer}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-70 grid place-items-center bg-ink/92 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <img
                src={active.image}
                alt={active.title}
                className="max-h-[65vh] w-full object-contain"
              />
              <div className="flex items-start justify-between gap-4 border-t border-line p-5">
                <div>
                  <h3 className="text-lg font-black">{active.title}</h3>
                  <p className="mt-1 text-sm text-fog">
                    {active.issuer} · {active.year}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="סגירה"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-volt hover:text-volt"
                >
                  <X className="size-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
