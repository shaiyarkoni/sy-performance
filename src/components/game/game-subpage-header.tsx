import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/site/brand";

export function GameSubpageHeader({ backHref = "/game" }: { backHref?: string }) {
  return (
    <header className="site-header-bar sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-xl">
      <div className="shell flex min-h-14 items-center justify-between gap-2 py-2.5 sm:min-h-16 sm:py-3">
        <Link href="/" className="min-w-0 shrink">
          <Brand compact />
        </Link>
        <Link
          href={backHref}
          className="inline-flex max-w-[48%] shrink-0 items-center gap-1.5 text-xs font-medium text-fog transition-colors hover:text-volt sm:max-w-none sm:gap-2 sm:text-sm"
        >
          <span className="truncate">חזרה למשחקים</span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>
    </header>
  );
}
