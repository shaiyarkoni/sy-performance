import type { Metadata } from "next";
import { GameSubpageHeader } from "@/components/game/game-subpage-header";
import { ReactionGame } from "@/components/game/reaction-game";

export const metadata: Metadata = {
  title: "Ring Reaction — מבחן זמן תגובה",
  description:
    "אתגר ביצועים: זיהוי צבע חריג בלוח מקשים 1–9, מדידת זמן תגובה ודיוק.",
};

export default function ReactionGamePage() {
  return (
    <>
      <GameSubpageHeader />
      <main className="flex flex-1 flex-col overflow-x-clip">
        <ReactionGame />
      </main>
    </>
  );
}
