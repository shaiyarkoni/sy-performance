"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { SiteContent } from "@/lib/types";

export function Testimonials({
  testimonials,
}: {
  testimonials: SiteContent["testimonials"];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    // The track is RTL, so a "next" scroll moves the offset in the negative direction.
    track.scrollBy({ left: -direction * amount, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="section overflow-hidden">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={testimonials.eyebrow}
            heading={testimonials.heading}
            subheading={testimonials.subheading}
          />

          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="ההמלצה הקודמת"
              className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-volt hover:text-volt"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="ההמלצה הבאה"
              className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-volt hover:text-volt"
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <Reveal>
        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:px-10"
        >
          {testimonials.items.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex w-[84vw] shrink-0 snap-start flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-volt/50 sm:w-[26rem]"
            >
              <div className="flex items-center justify-between">
                <Quote className="size-8 text-volt/35" />
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-volt text-volt"
                    />
                  ))}
                </div>
              </div>

              <p className="mt-5 flex-1 leading-relaxed text-chalk">
                {testimonial.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading="lazy"
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-fog">{testimonial.sport}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
