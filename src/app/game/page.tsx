import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { GameHubCarousel } from "@/components/game/game-hub-carousel";

export const metadata: Metadata = {
  title: "משחקי ביצועים — SY Performance",
  description: "Ring Reaction, Key Dash ו-Myth Check — אתגרי קצב, תגובה וידע.",
};

export default function GameHubPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-xl">
        <div className="shell flex h-16 items-center justify-between py-3">
          <Link href="/">
            <Brand compact />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-volt"
          >
            חזרה לאתר
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>

      <main className="shell flex flex-1 flex-col py-10 sm:py-14">
        <p className="text-xs font-bold tracking-[0.2em] text-volt uppercase">
          TEST GAME
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">בחר משחק</h1>
        <p className="mt-3 max-w-xl text-fog leading-relaxed">
          דפדף בין שלושת האתגרים — Ring Reaction, Key Dash ו-Myth Check.
        </p>

        <GameHubCarousel />
      </main>
    </>
  );
}
