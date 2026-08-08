import type { Metadata } from "next";
import { GameSubpageHeader } from "@/components/game/game-subpage-header";
import { SprintDuelGame } from "@/components/game/sprint-duel-game";

export const metadata: Metadata = {
  title: "Key Dash — מרוץ לחיצות ל-2 שחקנים",
  description:
    "תחרות מרוץ: שחקן 1 עם Space, שחקן 2 עם Enter — מי לוחץ מהר יותר מגיע לקו הסיום.",
};

export default function SprintDuelPage() {
  return (
    <>
      <GameSubpageHeader />
      <main className="flex flex-1 flex-col overflow-x-clip">
        <SprintDuelGame />
      </main>
    </>
  );
}
