import Image from "next/image";

const LOGO_WIDTH = 768;
const LOGO_HEIGHT = 384;

type BrandProps = {
  compact?: boolean;
  /** pill = מעוגל (ברירת מחדל); tile = פינות רכות יותר לגדולים */
  frame?: "pill" | "tile";
};

export function Brand({ compact = false, frame = "pill" }: BrandProps) {
  const height = compact ? 26 : 34;
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);

  const frameClass =
    frame === "tile"
      ? "rounded-2xl px-3.5 py-2 sm:px-4 sm:py-2.5"
      : compact
        ? "rounded-full px-2.5 py-1"
        : "rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2";

  return (
    <span
      dir="ltr"
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden border border-volt/25 bg-chalk leading-none shadow-[0_4px_24px_-6px_rgba(0,0,0,0.55)] ring-1 ring-white/50 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${frameClass}`}
    >
      <Image
        src="/logo.png"
        alt="SY Performance"
        width={width}
        height={height}
        priority={!compact}
        className="h-auto w-auto max-w-[min(100%,6.75rem)] object-contain object-center sm:max-w-[min(100%,8.25rem)] lg:max-w-[min(100%,10rem)]"
        sizes={compact ? "112px" : "160px"}
      />
    </span>
  );
}
