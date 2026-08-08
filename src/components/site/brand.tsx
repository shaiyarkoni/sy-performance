import Image from "next/image";

const LOGO_WIDTH = 768;
const LOGO_HEIGHT = 384;

export function Brand({ compact = false }: { compact?: boolean }) {
  const height = compact ? 32 : 42;
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);

  return (
    <span dir="ltr" className="inline-flex shrink-0 items-center leading-none">
      <Image
        src="/logo.png"
        alt="SY Performance"
        width={width}
        height={height}
        priority={!compact}
        className="h-auto w-auto max-w-[min(100%,9rem)] object-contain object-left sm:max-w-[min(100%,11rem)]"
        sizes={compact ? "128px" : "168px"}
      />
    </span>
  );
}
