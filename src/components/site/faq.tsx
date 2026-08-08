"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/types";

export function Faq({ faq }: { faq: SiteContent["faq"] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (faq.items.length === 0) return null;

  return (
    <section id="faq" className="section">
      <div className="shell max-w-3xl">
        <SectionHeading
          eyebrow={faq.eyebrow}
          heading={faq.heading}
          subheading={faq.subheading}
          align="center"
        />

        <ul className="mt-12 space-y-3">
          {faq.items.map((item, index) => {
            const open = openIds.has(item.id);

            return (
              <Reveal key={item.id} delay={index * 0.04}>
                <li className="overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-volt/40">
                  <button
                    type="button"
                    id={`faq-q-${item.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${item.id}`}
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-start gap-3 p-4 text-start transition-colors hover:text-volt sm:gap-4 sm:p-5"
                  >
                    <span
                      className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full border transition-colors ${
                        open
                          ? "border-volt bg-volt/15 text-volt"
                          : "border-line text-fog"
                      }`}
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                    <span className="flex-1 text-base leading-snug font-bold sm:text-lg">
                      {item.question}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        id={`faq-a-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-q-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-line px-4 pt-4 pb-5 leading-relaxed text-fog sm:px-5 sm:ps-[4.25rem]">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
