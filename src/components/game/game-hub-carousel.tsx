"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Brain, Zap } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { GAME_CATALOG } from "@/lib/game-catalog";

const icons = { zap: Zap, brain: Brain } as const;

function GameCard({
  game,
}: {
  game: (typeof GAME_CATALOG)[number];
}) {
  const Icon = icons[game.icon];

  return (
    <article className="h-full min-w-0">
      <Link
        href={game.href}
        className="group flex h-full min-h-[20rem] flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-volt/50 hover:bg-surface-hi sm:min-h-[22rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
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
}

function GameGrid({ className = "mt-10" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:max-w-4xl ${className}`}
    >
      {GAME_CATALOG.map((game) => (
        <GameCard key={game.href} game={game} />
      ))}
    </div>
  );
}

function GameCarousel() {
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
    <div className="mt-10">
      <div className="relative -mx-[max(1rem,env(safe-area-inset-left))] px-[max(1rem,env(safe-area-inset-left))] sm:-mx-8 sm:px-8 md:mx-0 md:px-0">
        <button
          type="button"
          aria-label="משחק קודם"
          onClick={() => scrollToIndex(active - 1)}
          disabled={active === 0}
          className="absolute start-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-ink/90 p-2 text-chalk transition-colors hover:border-volt hover:text-volt disabled:opacity-30 md:block"
        >
          <ChevronRight className="size-5" />
        </button>
        <button
          type="button"
          aria-label="משחק הבא"
          onClick={() => scrollToIndex(active + 1)}
          disabled={active === GAME_CATALOG.length - 1}
          className="absolute end-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-line bg-ink/90 p-2 text-chalk transition-colors hover:border-volt hover:text-volt disabled:opacity-30 md:block"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-1 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none"
        >
          {GAME_CATALOG.map((game) => (
            <div
              key={game.href}
              className="w-[min(calc(100vw-2.5rem),22rem)] shrink-0 snap-center md:w-auto md:shrink"
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-fog md:hidden">
        החלק ימינה ושמאלה לדפדוף בין משחקים
      </p>

      <div
        className="mt-5 flex items-center justify-center gap-2 md:hidden"
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

export function GameHubCarousel({ className }: { className?: string }) {
  if (GAME_CATALOG.length <= 2) {
    return <GameGrid className={className ?? "mt-10"} />;
  }

  return <GameCarousel />;
}
