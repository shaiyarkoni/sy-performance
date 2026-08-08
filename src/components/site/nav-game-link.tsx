import Link from "next/link";
import { Zap } from "lucide-react";

/** Navbar CTA — sits left of «דברו איתי» (LTR pair in RTL header). */
export function NavGameLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/game"
      aria-label="TEST GAME — מבחן זמן תגובה"
      title="TEST GAME"
      className={`group inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-volt/70 bg-ink/80 py-1.5 ps-1.5 pe-3 text-volt backdrop-blur-sm transition-all hover:border-volt hover:bg-volt hover:text-ink sm:gap-2 sm:py-2 sm:pe-4 ${className}`}
    >
      <span className="grid size-8 place-items-center rounded-full bg-volt text-ink transition-colors group-hover:bg-ink group-hover:text-volt sm:size-9">
        <Zap className="size-4 fill-current" strokeWidth={2.5} />
      </span>
      <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] sm:text-xs">
        TEST GAME
      </span>
    </Link>
  );
}
