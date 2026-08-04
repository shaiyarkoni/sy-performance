type Variant = "volt" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  volt: "bg-volt text-ink hover:bg-volt-deep hover:shadow-[0_0_28px_-6px_rgba(198,248,51,0.55)] active:scale-[0.98]",
  outline:
    "border border-line bg-transparent text-chalk hover:border-volt hover:text-volt active:scale-[0.98]",
  ghost: "text-fog hover:text-chalk",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClass(
  variant: Variant = "volt",
  size: Size = "md",
  extra = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
