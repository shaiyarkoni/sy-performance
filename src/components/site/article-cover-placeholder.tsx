type ArticleCoverPlaceholderProps = {
  title: string;
  bookLabel: string;
  badge: string;
  variant?: "featured" | "card";
  className?: string;
};

const variantStyles = {
  featured: {
    wrapper: "px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14",
    book: "scale-100 sm:scale-110 lg:scale-[1.22]",
    spine: "w-3",
    pages: "w-1.5",
    cover: "w-[12.5rem] p-5 sm:w-[14rem] sm:p-6 lg:w-[15.5rem] lg:p-7",
    insetOuter: "inset-2.5 sm:inset-3",
    insetInner: "inset-4 sm:inset-5",
    brand: "text-[10px] sm:text-[11px]",
    bookLabel: "mt-3 text-sm font-black sm:text-base",
    divider: "my-3.5 sm:my-4",
    title: "text-xs font-black sm:text-sm lg:text-[0.95rem]",
    badge: "mt-5 px-2.5 py-1 text-[10px] sm:text-[11px]",
    glow: "-inset-4 sm:-inset-5",
  },
  card: {
    wrapper: "px-6 py-8",
    book: "scale-100 sm:scale-105",
    spine: "w-2.5",
    pages: "w-1",
    cover: "w-[10.5rem] p-4 sm:w-[11.5rem] sm:p-5",
    insetOuter: "inset-2",
    insetInner: "inset-3",
    brand: "text-[9px] sm:text-[10px]",
    bookLabel: "mt-2.5 text-xs font-black sm:text-sm",
    divider: "my-3",
    title: "text-[11px] font-black sm:text-xs",
    badge: "mt-4 px-2 py-0.5 text-[9px] sm:text-[10px]",
    glow: "-inset-3",
  },
} as const;

export function ArticleCoverPlaceholder({
  title,
  bookLabel,
  badge,
  variant = "card",
  className = "",
}: ArticleCoverPlaceholderProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1014] via-surface to-ink ${className}`}
      aria-hidden
    >
      <div className="grid-bg absolute inset-0 opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(56,189,248,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_85%,rgba(198,248,51,0.08),transparent_50%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />

      <div
        className={`relative z-10 [perspective:900px] ${styles.wrapper}`}
      >
        <div
          className={`relative flex origin-center -rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03] ${styles.book}`}
        >
          <div
            className={`absolute rounded-xl bg-accent-cool/10 blur-2xl ${styles.glow}`}
            aria-hidden
          />

          <div className="relative flex shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <div
              className={`${styles.spine} shrink-0 rounded-s-sm bg-gradient-to-b from-accent-cool-deep via-accent-cool to-accent-cool/45`}
            />
            <div
              className={`${styles.pages} shrink-0 bg-gradient-to-b from-chalk/25 via-chalk/10 to-chalk/5`}
            />

            <div
              className={`relative border border-line/90 bg-gradient-to-br from-surface-hi via-surface to-[#121619] ${styles.cover}`}
            >
              <div
                className={`pointer-events-none absolute rounded-sm border border-accent-cool/25 ${styles.insetOuter}`}
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute rounded-sm border border-accent-cool/10 ${styles.insetInner}`}
                aria-hidden
              />

              <p
                className={`font-bold tracking-[0.28em] text-accent-cool uppercase ${styles.brand}`}
              >
                SY Performance
              </p>
              <p className={`leading-snug text-volt ${styles.bookLabel}`}>
                {bookLabel}
              </p>
              <div
                className={`h-px bg-gradient-to-l from-transparent via-line to-transparent ${styles.divider}`}
              />
              <h4 className={`leading-snug text-chalk line-clamp-5 ${styles.title}`}>
                {title}
              </h4>
              <span
                className={`inline-flex rounded-full border border-volt/35 bg-volt/10 font-bold text-volt ${styles.badge}`}
              >
                {badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
