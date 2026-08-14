"use client";

import { GameHubCarousel } from "@/components/game/game-hub-carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/lib/i18n/locale";

export function GameTeaser() {
  const { ui } = useLocale();

  return (
    <section id="games" className="section scroll-mt-28 bg-ink-soft">
      <div className="shell">
        <SectionHeading
          eyebrow={ui.gameHub.eyebrow}
          heading={ui.gameHub.heading}
          subheading={ui.gameHub.subheading}
        />
        <GameHubCarousel />
      </div>
    </section>
  );
}
