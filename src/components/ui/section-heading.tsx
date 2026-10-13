import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  subheading?: string;
  align?: "start" | "center";
};

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "start",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="stripes h-4 w-12 shrink-0 rounded-sm sm:h-5 sm:w-14" />
        <span className="text-base font-bold tracking-[0.16em] text-accent-cool uppercase sm:text-lg">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-black text-balance text-chalk sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {subheading ? (
        <p className="mt-4 text-base leading-relaxed text-fog sm:text-lg">
          {subheading}
        </p>
      ) : null}
    </Reveal>
  );
}
