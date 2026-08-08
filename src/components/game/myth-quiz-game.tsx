"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import {
  MYTH_QUIZ_BANK,
  pickQuizRound,
  mythQuizScoreLabel,
  type MythQuestion,
} from "@/lib/myth-quiz";

type Phase = "idle" | "quiz" | "feedback" | "results";

const LEVEL_LABEL: Record<MythQuestion["level"], string> = {
  easy: "קלה",
  medium: "בינונית",
  hard: "מאתגרת",
};

const ROUND_SIZE = 10;

export function MythQuizGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [questions, setQuestions] = useState<MythQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null);

  const total = questions.length;
  const current = questions[index];

  function startQuiz() {
    const round = pickQuizRound(ROUND_SIZE);
    setQuestions(round);
    setAnswers(round.map(() => null));
    setIndex(0);
    setLastAnswer(null);
    setPhase("quiz");
  }

  function answer(yes: boolean) {
    const next = [...answers];
    next[index] = yes;
    setAnswers(next);
    setLastAnswer(yes);
    setPhase("feedback");
  }

  function continueAfterFeedback() {
    setLastAnswer(null);
    if (index + 1 >= total) {
      setPhase("results");
    } else {
      setIndex(index + 1);
      setPhase("quiz");
    }
  }

  const correctCount = questions.reduce((n, q, i) => {
    const a = answers[i];
    if (a === null) return n;
    return a === q.answerYes ? n + 1 : n;
  }, 0);

  const feedbackQuestion = phase === "feedback" ? current : null;
  const feedbackOk =
    feedbackQuestion &&
    lastAnswer !== null &&
    lastAnswer === feedbackQuestion.answerYes;

  return (
    <div className="mx-auto w-full max-w-lg flex-1 px-4 py-8 sm:py-10">
      {phase === "idle" && (
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-volt uppercase">
            תזונה וכושר
          </p>
          <h1 className="mt-3 text-3xl font-black">Myth Check</h1>
          <p className="mt-2 text-sm font-bold text-volt">מבחן מיתוסים · כן / לא</p>
          <p className="mt-4 text-fog leading-relaxed">
            {ROUND_SIZE} שאלות אקראיות ממאגר של {MYTH_QUIZ_BANK.length} — מהקלות
            למאתגרות. אחרי כל תשובה תראה מיד אם צדקת והסבר; בסוף גם סיכום מלא.
            המטרה: לדעת מה נכון באמת, לא מה «שומעים בחדר כושר».
          </p>
          <button
            type="button"
            onClick={startQuiz}
            className={buttonClass("volt", "lg", "mt-8 w-full")}
          >
            התחל שאלון
          </button>
        </div>
      )}

      {phase === "quiz" && current ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-fog">
            <span>
              שאלה {index + 1} / {total}
            </span>
            <span className="rounded-full border border-line px-2 py-0.5">
              {LEVEL_LABEL[current.level]}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-volt transition-all duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>

          <p className="text-xl font-bold leading-snug text-chalk sm:text-2xl">
            {current.text}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              type="button"
              onClick={() => answer(true)}
              className="rounded-2xl border-2 border-volt/50 bg-volt/10 py-5 text-lg font-black text-volt transition-transform hover:scale-[1.02] active:scale-95"
            >
              כן
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="rounded-2xl border-2 border-line bg-surface py-5 text-lg font-black text-chalk transition-transform hover:border-fog hover:scale-[1.02] active:scale-95"
            >
              לא
            </button>
          </div>
        </div>
      ) : null}

      {phase === "feedback" && feedbackQuestion && lastAnswer !== null ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-fog">
            <span>
              שאלה {index + 1} / {total}
            </span>
            <span className="rounded-full border border-line px-2 py-0.5">
              {LEVEL_LABEL[feedbackQuestion.level]}
            </span>
          </div>

          <div
            className={
              feedbackOk
                ? "rounded-2xl border border-volt/40 bg-volt/10 p-5"
                : "rounded-2xl border border-red-400/50 bg-red-400/10 p-5"
            }
          >
            <div className="flex items-start gap-3">
              {feedbackOk ? (
                <CheckCircle2 className="size-8 shrink-0 text-volt" />
              ) : (
                <XCircle className="size-8 shrink-0 text-red-400" />
              )}
              <div>
                <p
                  className={
                    feedbackOk
                      ? "text-lg font-black text-volt"
                      : "text-lg font-black text-red-300"
                  }
                >
                  {feedbackOk ? "נכון!" : "לא מדויק — כדאי לדעת"}
                </p>
                {!feedbackOk ? (
                  <p className="mt-2 text-sm text-chalk">
                    בחרת:{" "}
                    <strong>{lastAnswer ? "כן" : "לא"}</strong>
                    {" · "}
                    תשובה נכונה:{" "}
                    <strong>
                      {feedbackQuestion.answerYes ? "כן" : "לא"}
                    </strong>
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <p className="text-sm font-bold leading-snug text-chalk/90">
            {feedbackQuestion.text}
          </p>

          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-xs font-bold tracking-wide text-volt uppercase">
              הסבר
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fog">
              {feedbackQuestion.explanation}
            </p>
          </div>

          <button
            type="button"
            onClick={continueAfterFeedback}
            className={buttonClass("volt", "lg", "w-full")}
          >
            {index + 1 >= total ? "לסיכום והציון" : "לשאלה הבאה"}
          </button>
        </div>
      ) : null}

      {phase === "results" && questions.length > 0 && (
        <div className="space-y-8">
          <div className="rounded-2xl border border-volt/40 bg-volt/5 p-6 text-center">
            <p className="text-xs font-bold tracking-[0.15em] text-volt uppercase">
              הציון שלך
            </p>
            <p className="mt-2 text-4xl font-black tabular-nums text-volt sm:text-5xl">
              {correctCount}/{total}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fog">
              {mythQuizScoreLabel(correctCount, total)}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-black">סיכום תשובות</h2>
            <ul className="space-y-4">
              {questions.map((q, i) => {
                const user = answers[i];
                const ok = user === q.answerYes;
                return (
                  <li
                    key={q.id}
                    className="rounded-xl border border-line bg-surface p-4 text-sm"
                  >
                    <div className="flex gap-2">
                      {ok ? (
                        <CheckCircle2 className="size-5 shrink-0 text-volt" />
                      ) : (
                        <XCircle className="size-5 shrink-0 text-red-400" />
                      )}
                      <div>
                        <p className="font-bold leading-snug text-chalk">
                          {i + 1}. {q.text}
                        </p>
                        <p className="mt-2 text-fog">
                          תשובה נכונה:{" "}
                          <strong className="text-chalk">
                            {q.answerYes ? "כן" : "לא"}
                          </strong>
                          {user !== null && !ok ? (
                            <>
                              {" "}
                              · בחרת: {user ? "כן" : "לא"}
                            </>
                          ) : null}
                        </p>
                        <p className="mt-2 leading-relaxed text-fog/90">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={startQuiz}
            className={buttonClass("volt", "lg", "w-full")}
          >
            <RotateCcw className="size-4" />
            משחק חדש (שאלות אחרות)
          </button>
        </div>
      )}
    </div>
  );
}
