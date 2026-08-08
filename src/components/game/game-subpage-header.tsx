import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/site/brand";

export function GameSubpageHeader({ backHref = "/game" }: { backHref?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between py-3">
        <Link href="/">
          <Brand compact />
        </Link>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-volt"
        >
          חזרה למשחקים
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
