import Link from "next/link";
import { Zap } from "lucide-react";

export function GameFab() {
  return (
    <Link
      href="/game"
      aria-label="TEST GAME — מבחן זמן תגובה Ring Reaction"
      title="TEST GAME — אתגר ביצועים"
      className="group fixed bottom-24 start-6 z-40 inline-flex max-w-[calc(100vw-3rem)] items-center gap-2.5 rounded-full border-2 border-volt bg-ink/95 py-2.5 ps-2.5 pe-5 shadow-[0_10px_40px_-8px_rgba(198,248,51,0.55)] ring-2 ring-volt/25 backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-volt active:scale-95"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt text-ink transition-colors group-hover:bg-ink group-hover:text-volt">
        <Zap className="size-5 fill-current" strokeWidth={2.5} />
      </span>
      <span className="text-sm font-extrabold uppercase tracking-[0.08em] text-volt transition-colors group-hover:text-ink">
        TEST GAME
      </span>
    </Link>
  );
}
