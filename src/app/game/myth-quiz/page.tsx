import type { Metadata } from "next";
import { GameSubpageHeader } from "@/components/game/game-subpage-header";
import { MythQuizGame } from "@/components/game/myth-quiz-game";

export const metadata: Metadata = {
  title: "Myth Check — מיתוסים בתזונה וכושר",
  description: "10 שאלות כן/לא על מיתוסים — מהקלות למאתגרות, עם ציון והסברים.",
};

export default function MythQuizPage() {
  return (
    <>
      <GameSubpageHeader />
      <main className="flex flex-1 flex-col">
        <MythQuizGame />
      </main>
    </>
  );
}
