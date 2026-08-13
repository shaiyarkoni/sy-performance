"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Brain, Zap } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { GAME_CATALOG } from "@/lib/game-catalog";

const icons = { zap: Zap, brain: Brain } as const;

export function GameHubCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(GAME_CATALOG.length - 1, index));
    const slide = el.children.item(clamped) as HTMLElement | null;
    slide?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setActive(clamped);
  }, []);

  function onScroll() {
    const el = scrollerRef.current;
    if (!el || el.children.length === 0) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children.item(i) as HTMLElement;
      const center = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    setActive(best);
  }

  return (
    <div className="mt-10 full-bleed overflow-x-clip">
      <div className="relative">
        <button
          type="button"
          aria-label="משחק קודם"
          onClick={() => scrollToIndex(active - 1)}
          disabled={active === 0}
          className="absolute start-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-ink/90 p-2 text-chalk transition-colors hover:border-volt hover:text-volt disabled:opacity-30 sm:block"
        >
          <ChevronRight className="size-5" />
        </button>
        <button
          type="button"
          aria-label="משחק הבא"
          onClick={() => scrollToIndex(active + 1)}
          disabled={active === GAME_CATALOG.length - 1}
          className="absolute end-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-ink/90 p-2 text-chalk transition-colors hover:border-volt hover:text-volt disabled:opacity-30 sm:block"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-1 ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] sm:ps-8 sm:pe-8"
          style={{ direction: "ltr" }}
        >
          {GAME_CATALOG.map((game) => {
            const Icon = icons[game.icon];
            return (
              <article
                key={game.href}
                className="w-[min(100%,22rem)] shrink-0 snap-center sm:w-[min(85%,24rem)]"
              >
                <Link
                  href={game.href}
                  className="group flex h-full min-h-[22rem] flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-volt/50 hover:bg-surface-hi sm:min-h-[24rem] sm:p-8"
                  style={{ direction: "rtl" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-volt uppercase">
                        {game.subtitleHe}
                      </p>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-chalk group-hover:text-volt sm:text-3xl">
                        {game.title}
                      </h2>
                    </div>
                    <span className="grid size-14 shrink-0 place-items-center rounded-xl border border-volt/40 bg-volt/10 text-volt">
                      <Icon className="size-7" strokeWidth={2.25} />
                    </span>
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-fog sm:text-base">
                    {game.description}
                  </p>
                  <span className={buttonClass("volt", "lg", "mt-8 w-full")}>
                    {game.cta}
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-fog sm:hidden">
        החלק ימינה ושמאלה לדפדוף בין משחקים
      </p>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="בחירת משחק"
      >
        {GAME_CATALOG.map((game, i) => (
          <button
            key={game.href}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={game.title}
            onClick={() => scrollToIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              active === i
                ? "w-8 bg-volt"
                : "w-2.5 bg-line hover:bg-fog/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
