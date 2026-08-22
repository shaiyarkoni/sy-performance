import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { GameHubCarousel } from "@/components/game/game-hub-carousel";

export const metadata: Metadata = {
  title: "משחקי ביצועים — SY Performance",
  description: "Ring Reaction ו-Myth Check — אתגרי קצב, תגובה וידע.",
};

export default function GameHubPage() {
  return (
    <>
      <header className="site-header-bar sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-xl">
      <div className="shell flex min-h-14 items-center justify-between gap-2 py-2.5 sm:min-h-16 sm:py-3">
        <Link href="/" className="min-w-0 shrink">
          <Brand compact />
        </Link>
        <Link
          href="/"
          className="inline-flex max-w-[45%] shrink-0 items-center gap-1.5 text-xs font-medium text-fog transition-colors hover:text-volt sm:max-w-none sm:gap-2 sm:text-sm"
        >
          <span className="truncate">חזרה לאתר</span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>
    </header>

    <main className="shell flex flex-1 flex-col overflow-x-clip py-8 sm:py-14">
        <p className="text-xs font-bold tracking-[0.2em] text-accent-cool uppercase">
          TEST GAME
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">בחר משחק</h1>
        <p className="mt-3 max-w-xl text-fog leading-relaxed">
          דפדף בין שני האתגרים — Ring Reaction ו-Myth Check.
        </p>

        <GameHubCarousel />
      </main>
    </>
  );
}
