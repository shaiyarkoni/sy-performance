"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Share2, Trophy, Volume2, VolumeX } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { useGameAudio } from "@/components/game/use-game-audio";
import {
  digitKeyToIndex,
  getPerformanceTier,
  loadPersonalBest,
  NUMPAD_DIGITS,
  NUMPAD_ROWS,
  savePersonalBestIfBetter,
  tierFeedback,
  tierLabel,
  type ReactionPersonalBest,
} from "@/lib/reaction-game";

const DURATION_SEC = 30;
const KEY_COUNT = 9;

type Phase = "idle" | "countdown" | "playing" | "results";

type Palette = {
  base: string;
  baseGlow: string;
  odd: string;
  oddGlow: string;
  label: string;
};

const PALETTES: Palette[] = [
  {
    base: "#ff3b5c",
    baseGlow: "rgba(255,59,92,0.55)",
    odd: "#c6f833",
    oddGlow: "rgba(198,248,51,0.7)",
    label: "ירוק על רקע אדום",
  },
  {
    base: "#3b82ff",
    baseGlow: "rgba(59,130,255,0.55)",
    odd: "#facc15",
    oddGlow: "rgba(250,204,21,0.75)",
    label: "צהוב על רקע כחול",
  },
  {
    base: "#a855f7",
    baseGlow: "rgba(168,85,247,0.5)",
    odd: "#22d3ee",
    oddGlow: "rgba(34,211,238,0.7)",
    label: "ציאן על רקע סגול",
  },
];

type RoundState = {
  colors: string[];
  oddIndex: number;
  shownAt: number;
};

function randomDelay() {
  return 150 + Math.random() * 250;
}

function pickPalette(): Palette {
  return PALETTES[Math.floor(Math.random() * PALETTES.length)]!;
}

function buildRound(): RoundState {
  const palette = pickPalette();
  const oddIndex = Math.floor(Math.random() * KEY_COUNT);
  const colors = Array.from({ length: KEY_COUNT }, (_, i) =>
    i === oddIndex ? palette.odd : palette.base,
  );
  return { colors, oddIndex, shownAt: performance.now() };
}

function scoreFromReaction(ms: number) {
  return Math.max(40, Math.round(850 - ms * 1.4));
}

export function ReactionGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(DURATION_SEC);
  const [round, setRound] = useState<RoundState | null>(null);
  const [roundActive, setRoundActive] = useState(false);
  const [flash, setFlash] = useState<"success" | "error" | null>(null);
  const [personalBest, setPersonalBest] = useState<ReactionPersonalBest | null>(
    null,
  );

  const [score, setScore] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [copyMsg, setCopyMsg] = useState("");

  const {
    muted,
    audioBlocked,
    setMuted,
    startArena,
    stopArena,
    playSwish,
    playMiss,
    playBuzzer,
  } = useGameAudio();

  const phaseRef = useRef(phase);
  const roundActiveRef = useRef(roundActive);
  const roundRef = useRef(round);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimeRef = useRef(0);
  const countdownSessionRef = useRef(0);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    roundActiveRef.current = roundActive;
  }, [roundActive]);
  useEffect(() => {
    roundRef.current = round;
  }, [round]);

  useEffect(() => {
    setPersonalBest(loadPersonalBest());
  }, []);

  const clearDelayTimer = useCallback(() => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
  }, []);

  const scheduleNextRound = useCallback(() => {
    clearDelayTimer();
    setRoundActive(false);
    setRound(null);
    if (phaseRef.current !== "playing" || performance.now() >= endTimeRef.current) {
      return;
    }
    delayTimerRef.current = setTimeout(() => {
      if (phaseRef.current !== "playing" || performance.now() >= endTimeRef.current) {
        return;
      }
      const next = buildRound();
      next.shownAt = performance.now();
      setRound(next);
      setRoundActive(true);
    }, randomDelay());
  }, [clearDelayTimer]);

  const beginPlaying = useCallback(() => {
    endTimeRef.current = performance.now() + DURATION_SEC * 1000;
    phaseRef.current = "playing";
    setTimeLeft(DURATION_SEC);
    setPhase("playing");
    requestAnimationFrame(() => scheduleNextRound());
  }, [scheduleNextRound]);

  const finishGame = useCallback(() => {
    clearDelayTimer();
    endTimeRef.current = 0;
    stopArena();
    playBuzzer();
    setPhase("results");
    setRoundActive(false);
    setRound(null);
  }, [clearDelayTimer, stopArena, playBuzzer]);

  useEffect(() => {
    if (phase !== "playing") return;
    if (endTimeRef.current <= 0) return;

    const tick = setInterval(() => {
      if (endTimeRef.current <= 0) return;
      const remaining = Math.max(
        0,
        Math.ceil((endTimeRef.current - performance.now()) / 1000),
      );
      setTimeLeft(remaining);
      if (performance.now() >= endTimeRef.current) finishGame();
    }, 100);
    return () => clearInterval(tick);
  }, [phase, finishGame]);

  useEffect(() => {
    if (phase !== "countdown") return;

    const session = countdownSessionRef.current;

    if (countdown <= 0) {
      beginPlaying();
      return;
    }

    const t = setTimeout(() => {
      if (countdownSessionRef.current !== session) return;
      setCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, countdown, beginPlaying]);

  useEffect(() => () => clearDelayTimer(), [clearDelayTimer]);

  function startTest() {
    clearDelayTimer();
    endTimeRef.current = 0;
    countdownSessionRef.current += 1;
    setScore(0);
    setRoundsCompleted(0);
    setReactionTimes([]);
    setCorrectCount(0);
    setAttemptCount(0);
    setFlash(null);
    setRound(null);
    setRoundActive(false);
    setCountdown(3);
    startArena();
    setPhase("countdown");
  }

  function handleToggleSound() {
    if (muted) {
      setMuted(false);
      if (phase === "countdown" || phase === "playing") startArena();
    } else {
      stopArena();
      setMuted(true);
    }
  }

  const handleKeyPress = useCallback(
    (index: number) => {
      if (phaseRef.current !== "playing") return;
      if (!roundActiveRef.current || !roundRef.current) return;

      const current = roundRef.current;
      setAttemptCount((n) => n + 1);

      if (index === current.oddIndex) {
        const rt = performance.now() - current.shownAt;
        setReactionTimes((prev) => [...prev, rt]);
        setCorrectCount((c) => c + 1);
        setRoundsCompleted((r) => r + 1);
        setScore((s) => s + scoreFromReaction(rt));
        setFlash("success");
        setTimeout(() => setFlash(null), 180);
        playSwish();
        scheduleNextRound();
      } else {
        setScore((s) => Math.max(0, s - 80));
        setFlash("error");
        setTimeout(() => setFlash(null), 220);
        playMiss();
      }
    },
    [scheduleNextRound, playSwish, playMiss],
  );

  useEffect(() => {
    if (phase !== "playing") return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const digit = Number(e.key);
      if (digit < 1 || digit > 9 || !Number.isInteger(digit)) return;
      const index = digitKeyToIndex(digit);
      if (index === null) return;
      e.preventDefault();
      handleKeyPress(index);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, handleKeyPress]);

  const accuracy =
    attemptCount === 0 ? 0 : (correctCount / attemptCount) * 100;
  const avgMs =
    reactionTimes.length === 0
      ? 0
      : reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
  const peakMs =
    reactionTimes.length === 0 ? 0 : Math.min(...reactionTimes);

  useEffect(() => {
    if (phase !== "results" || roundsCompleted === 0) return;
    const saved = savePersonalBestIfBetter({
      score,
      avgMs: Math.round(avgMs) || 9999,
      peakMs: Math.round(peakMs) || 9999,
      accuracy: Math.round(accuracy * 10) / 10,
    });
    if (saved) setPersonalBest(saved);
  }, [phase, score, avgMs, peakMs, accuracy, roundsCompleted]);

  const tier =
    phase === "results" ? getPerformanceTier(score) : "needsWork";
  const feedback =
    phase === "results"
      ? tierFeedback(tier, score, avgMs, accuracy)
      : { headline: "", tips: [] };

  async function shareResult() {
    const text = [
      "SY Performance — מבחן זמן תגובה",
      `ניקוד: ${score}`,
      `ממוצע: ${Math.round(avgMs)}ms | שיא: ${Math.round(peakMs)}ms`,
      `דיוק: ${accuracy.toFixed(0)}% | ${tierLabel(tier)}`,
    ].join("\n");
    if (navigator.share) {
      try {
        await navigator.share({ title: "תוצאת מבחן תגובה", text });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    await navigator.clipboard.writeText(text);
    setCopyMsg("הועתק ללוח");
    setTimeout(() => setCopyMsg(""), 2000);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-lg flex-1 touch-manipulation px-4 py-8 sm:py-10"
      style={{ touchAction: "manipulation" }}
    >
      {phase === "idle" && (
        <div className="mx-auto max-w-md text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-volt uppercase">
            אתגר ביצועים
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Ring Reaction
          </h1>
          <p className="mt-4 text-fog leading-relaxed">
            לוח מקשים 1–9 (כמו במקלדת מספרים). בשמונה מקשים צבע אחד — באחד
            צבע שונה. לחץ על הספרה החריגה בעכבר או על המקש 1–9 במקלדת. 30
            שניות של תגובה, זיהוי ומודעות.
          </p>
          {personalBest ? (
            <div className="mt-6 rounded-2xl border border-line bg-surface p-4 text-sm">
              <div className="flex items-center justify-center gap-2 font-bold text-volt">
                <Trophy className="size-4" />
                השיא האישי שלך (בדפדפן הזה)
              </div>
              <p className="mt-2 text-fog">
                ניקוד {personalBest.score} · ממוצע {personalBest.avgMs}ms ·
                דיוק {personalBest.accuracy}%
              </p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={startTest}
            className={buttonClass("volt", "lg", "mt-8 w-full")}
          >
            התחל מבחן
          </button>
          <p className="mt-3 text-xs text-fog/75">
            עם ההתחלה: רעש קהל באולם, צליל רשת בפגיעה ו-buzzer בסיום (אפשר
            להשתיק במהלך המשחק).
          </p>
        </div>
      )}

      {phase === "countdown" && (
        <div className="relative grid min-h-[50vh] place-items-center">
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={muted ? "הפעל סאונד אולם" : "השתק סאונד אולם"}
            className="absolute top-0 end-0 grid size-11 place-items-center rounded-full border border-line bg-surface text-fog transition-colors hover:border-volt/50 hover:text-volt"
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
          <span className="text-8xl font-black text-volt tabular-nums animate-pulse">
            {countdown}
          </span>
          <p className="absolute bottom-8 max-w-xs text-center text-xs text-fog/80">
            {muted
              ? "סאונד כבוי — לחץ על הרמקול לאווירת אולם"
              : audioBlocked
                ? "הדפדפן חסם שמע — לחץ שוב «התחל מבחן» או על הרמקול"
                : "אווירת קהל באולם…"}
          </p>
        </div>
      )}

      {phase === "playing" && (
        <>
          <div className="mb-4 flex items-center justify-end">
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label={muted ? "הפעל סאונד אולם" : "השתק סאונד אולם"}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-fog transition-colors hover:border-volt/50 hover:text-volt"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              {muted ? "הפעל סאונד" : "סאונד אולם"}
            </button>
          </div>
          <div className="mb-6 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-xl border border-line bg-surface px-2 py-3">
              <div className="text-xs text-fog">זמן</div>
              <div className="text-xl font-black tabular-nums text-volt">
                {timeLeft}s
              </div>
            </div>
            <div className="rounded-xl border border-line bg-surface px-2 py-3">
              <div className="text-xs text-fog">ניקוד</div>
              <div className="text-xl font-black tabular-nums">{score}</div>
            </div>
            <div className="rounded-xl border border-line bg-surface px-2 py-3">
              <div className="text-xs text-fog">דיוק</div>
              <div className="text-xl font-black tabular-nums">
                {attemptCount === 0 ? "—" : `${accuracy.toFixed(0)}%`}
              </div>
            </div>
          </div>

          <div
            className={`mx-auto w-full max-w-[min(100%,20rem)] rounded-2xl border border-line bg-[#0d0f12] p-3 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] ${
              flash === "error" ? "animate-shake" : ""
            }`}
          >
            <div className="mb-2 text-center text-xs font-medium text-fog/90">
              {roundActive ? "מצא את הספרה בצבע השונה" : "הכן..."}
            </div>
            <div
              className="mx-auto flex w-full max-w-[14rem] flex-col gap-2"
              style={{ direction: "ltr" }}
            >
              {NUMPAD_ROWS.map((row) => (
                <div
                  key={row.join("-")}
                  className="grid grid-cols-3 gap-2"
                  style={{ direction: "ltr" }}
                >
                  {row.map((digit) => {
                    const i = NUMPAD_DIGITS.indexOf(
                      digit as (typeof NUMPAD_DIGITS)[number],
                    );
                    const lit = roundActive && round;
                    const fill = lit ? round.colors[i]! : "#1a1f26";
                    const isOdd = lit && i === round.oddIndex;
                    const glow = lit
                      ? isOdd
                        ? "0 0 22px rgba(198,248,51,0.55)"
                        : "0 0 12px rgba(255,255,255,0.12)"
                      : "none";

                    return (
                      <button
                        key={digit}
                        type="button"
                        disabled={!roundActive}
                        aria-label={`מקש ${digit}`}
                        onClick={() => handleKeyPress(i)}
                        className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 text-2xl font-black tabular-nums transition-transform duration-100 active:scale-95 disabled:cursor-default disabled:opacity-45"
                        style={{
                          backgroundColor: fill,
                          borderColor: lit ? fill : "#2a323c",
                          boxShadow: glow,
                          color: lit ? "#0d0f12" : "#4b5563",
                        }}
                      >
                        {digit}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] text-fog/70">
              אפשר גם ללחוץ 1–9 במקלדת
            </p>
          </div>

          {flash === "success" && (
            <p className="mt-4 text-center text-sm font-bold text-volt">
              פגיעה מדויקת
            </p>
          )}
          {flash === "error" && (
            <p className="mt-4 text-center text-sm font-bold text-red-400">
              לא נכון — -80 נקודות
            </p>
          )}
        </>
      )}

      {phase === "results" && (
        <div className="mx-auto max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black">סיכום ביצועים</h2>
            <p className="mt-2 text-fog">{feedback.headline}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Stat label="ניקוד סופי" value={String(score)} highlight />
            <Stat label="סיבובים שהושלמו" value={String(roundsCompleted)} />
            <Stat
              label="ממוצע תגובה"
              value={reactionTimes.length ? `${Math.round(avgMs)} ms` : "—"}
            />
            <Stat
              label="שיא תגובה"
              value={reactionTimes.length ? `${Math.round(peakMs)} ms` : "—"}
            />
            <Stat label="דיוק" value={`${accuracy.toFixed(0)}%`} />
            <Stat label="דרגה" value={tierLabel(tier)} />
          </div>

          {personalBest ? (
            <div className="rounded-2xl border border-volt/30 bg-volt/5 p-4 text-sm">
              <div className="font-bold text-volt">שיא אישי (בדפדפן)</div>
              <p className="mt-1 text-chalk">
                ניקוד {personalBest.score} · ממוצע {personalBest.avgMs}ms ·
                שיא {personalBest.peakMs}ms · דיוק {personalBest.accuracy}%
              </p>
              {score >= personalBest.score && score > 0 ? (
                <p className="mt-2 text-xs text-volt">
                  שברת את השיא האישי במבחן הזה
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="rounded-2xl border border-line bg-surface p-4">
            <h3 className="font-bold">מה לשפר</h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-fog">
              {feedback.tips.map((tip) => (
                <li key={tip.slice(0, 40)}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={startTest}
              className={buttonClass("volt", "lg", "flex-1")}
            >
              <RotateCcw className="size-4" />
              נסה שוב
            </button>
            <button
              type="button"
              onClick={shareResult}
              className={buttonClass("outline", "lg", "flex-1")}
            >
              <Share2 className="size-4" />
              שתף / העתק
            </button>
          </div>
          {copyMsg ? (
            <p className="text-center text-xs text-volt">{copyMsg}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight ? "border-volt/50 bg-volt/5" : "border-line bg-surface"
      }`}
    >
      <div className="text-xs text-fog">{label}</div>
      <div
        className={`mt-1 font-black tabular-nums ${highlight ? "text-volt" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
