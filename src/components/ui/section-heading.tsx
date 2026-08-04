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
        <span className="h-px w-8 bg-volt" />
        <span className="text-xs font-bold tracking-[0.22em] text-volt uppercase">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-black text-balance sm:text-4xl lg:text-5xl">
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
