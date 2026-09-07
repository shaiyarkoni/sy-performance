import Link from "next/link";
import { Zap } from "lucide-react";
import { UI } from "@/lib/i18n/ui";

const label = UI.he.testGame;

export function GameFab() {
  return (
    <Link
      href="/game/myth-quiz"
      aria-label={`${label} — שאלון מיתוסים בתזונה וכושר`}
      title={label}
      className="group fixed bottom-24 start-6 z-40 inline-flex max-w-[calc(100vw-3rem)] items-center gap-2.5 rounded-full border-2 border-volt bg-ink/95 py-2.5 ps-2.5 pe-5 shadow-volt-fab ring-2 ring-volt/25 backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-volt active:scale-95"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-volt text-ink transition-colors group-hover:bg-ink group-hover:text-volt">
        <Zap className="size-5 fill-current" strokeWidth={2.5} />
      </span>
      <span className="text-sm font-extrabold text-volt transition-colors group-hover:text-ink">
        {label}
      </span>
    </Link>
  );
}
