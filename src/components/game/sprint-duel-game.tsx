"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

const TAP_GOAL = 50;
const TRACK_LEN = 100;

type Phase = "idle" | "countdown" | "racing" | "results";

type Winner = 1 | 2 | "tie" | null;

function speedMultiplier(msSinceLastTap: number) {
  return Math.min(2.4, 200 / Math.max(msSinceLastTap, 55));
}

export function SprintDuelGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [countdown, setCountdown] = useState(3);
  const [p1Pos, setP1Pos] = useState(0);
  const [p2Pos, setP2Pos] = useState(0);
  const [p1Taps, setP1Taps] = useState(0);
  const [p2Taps, setP2Taps] = useState(0);
  const [winner, setWinner] = useState<Winner>(null);

  const phaseRef = useRef(phase);
  const p1PosRef = useRef(0);
  const p2PosRef = useRef(0);
  const p1TapsRef = useRef(0);
  const p2TapsRef = useRef(0);
  const lastP1TapRef = useRef(0);
  const lastP2TapRef = useRef(0);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const finishRace = useCallback((w: Winner) => {
    setWinner(w);
    setPhase("results");
  }, []);

  const registerTap = useCallback(
    (player: 1 | 2) => {
      if (phaseRef.current !== "racing") return;

      const now = performance.now();

      if (player === 1) {
        const dt = lastP1TapRef.current ? now - lastP1TapRef.current : 300;
        lastP1TapRef.current = now;
        const step = (TRACK_LEN / TAP_GOAL) * speedMultiplier(dt);
        const nextPos = Math.min(TRACK_LEN, p1PosRef.current + step);
        const nextTaps = p1TapsRef.current + 1;
        p1PosRef.current = nextPos;
        p1TapsRef.current = nextTaps;
        setP1Pos(nextPos);
        setP1Taps(nextTaps);
        if (nextPos >= TRACK_LEN || nextTaps >= TAP_GOAL) {
          finishRace(p2PosRef.current >= TRACK_LEN ? "tie" : 1);
        }
      } else {
        const dt = lastP2TapRef.current ? now - lastP2TapRef.current : 300;
        lastP2TapRef.current = now;
        const step = (TRACK_LEN / TAP_GOAL) * speedMultiplier(dt);
        const nextPos = Math.min(TRACK_LEN, p2PosRef.current + step);
        const nextTaps = p2TapsRef.current + 1;
        p2PosRef.current = nextPos;
        p2TapsRef.current = nextTaps;
        setP2Pos(nextPos);
        setP2Taps(nextTaps);
        if (nextPos >= TRACK_LEN || nextTaps >= TAP_GOAL) {
          finishRace(p1PosRef.current >= TRACK_LEN ? "tie" : 2);
        }
      }
    },
    [finishRace],
  );

  useEffect(() => {
    if (phase !== "racing") return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.code === "Space") {
        e.preventDefault();
        registerTap(1);
      } else if (e.code === "Enter") {
        e.preventDefault();
        registerTap(2);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, registerTap]);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      setPhase("racing");
      lastP1TapRef.current = 0;
      lastP2TapRef.current = 0;
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  function startRace() {
    p1PosRef.current = 0;
    p2PosRef.current = 0;
    p1TapsRef.current = 0;
    p2TapsRef.current = 0;
    lastP1TapRef.current = 0;
    lastP2TapRef.current = 0;
    setP1Pos(0);
    setP2Pos(0);
    setP1Taps(0);
    setP2Taps(0);
    setWinner(null);
    setCountdown(3);
    setPhase("countdown");
  }

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8 sm:py-10">
      {phase === "idle" && (
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-volt uppercase">
            2 שחקנים · מקלדת אחת
          </p>
          <h1 className="mt-3 text-3xl font-black">Key Dash</h1>
          <p className="mt-2 text-sm font-bold text-volt">מרוץ לחיצות · 2 שחקנים</p>
          <p className="mt-4 text-fog leading-relaxed">
            שני רצים על אותו מסלול.{" "}
            <strong className="text-chalk">שחקן 1</strong> — מקש{" "}
            <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-sm text-volt">
              Space
            </kbd>
            . <strong className="text-chalk">שחקן 2</strong> —{" "}
            <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-sm text-volt">
              Enter
            </kbd>
            . מי שלוחץ <em>מהר יותר</em> זז מהר יותר — אפשר לעקוף! קו הסיום
            אחרי {TAP_GOAL} לחיצות אפקטיביות.
          </p>
          <button
            type="button"
            onClick={startRace}
            className={buttonClass("volt", "lg", "mt-8 w-full max-w-sm")}
          >
            התחל מרוץ
          </button>
        </div>
      )}

      {phase === "countdown" && (
        <div className="grid min-h-[40vh] place-items-center">
          <span className="text-6xl font-black text-volt tabular-nums animate-pulse sm:text-8xl">
            {countdown}
          </span>
        </div>
      )}

      {(phase === "racing" || phase === "results") && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="rounded-xl border border-volt/40 bg-volt/5 p-3">
              <div className="text-xs text-fog">שחקן 1 · Space</div>
              <div className="text-xl font-black tabular-nums text-volt">
                {p1Taps} / {TAP_GOAL}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-surface p-3">
              <div className="text-xs text-fog">שחקן 2 · Enter</div>
              <div className="text-xl font-black tabular-nums">
                {p2Taps} / {TAP_GOAL}
              </div>
            </div>
          </div>

          <div
            className="space-y-6 rounded-2xl border border-line bg-[#0d1014] p-4 sm:p-6"
            style={{ direction: "ltr" }}
          >
            <TrackLane label="P1" color="#c6f833" position={p1Pos} />
            <div className="relative h-1 rounded-full bg-line">
              <div
                className="absolute inset-y-0 end-0 w-1 rounded-full bg-chalk shadow-[0_0_12px_rgba(245,247,248,0.8)]"
                aria-hidden
              />
              <span className="absolute -top-6 end-0 text-[10px] font-bold text-fog">
                FINISH
              </span>
            </div>
            <TrackLane label="P2" color="#3b82ff" position={p2Pos} />
          </div>

          {phase === "racing" ? (
            <p className="text-center text-sm text-fog animate-pulse">
              לחצו מהר — מי ראשון לקו!
            </p>
          ) : null}

          {phase === "results" ? (
            <div className="rounded-2xl border border-line bg-surface p-6 text-center">
              <Trophy className="mx-auto size-10 text-volt" />
              <h2 className="mt-3 text-2xl font-black">
                {winner === 1
                  ? "שחקן 1 ניצח!"
                  : winner === 2
                    ? "שחקן 2 ניצח!"
                    : "תיקו!"}
              </h2>
              <p className="mt-2 text-sm text-fog">
                לחיצות: {p1Taps} מול {p2Taps}
              </p>
              <button
                type="button"
                onClick={startRace}
                className={buttonClass("volt", "lg", "mt-6 w-full")}
              >
                <RotateCcw className="size-4" />
                מרוץ נוסף
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function TrackLane({
  label,
  color,
  position,
}: {
  label: string;
  color: string;
  position: number;
}) {
  return (
    <div className="relative h-14 overflow-hidden rounded-xl border border-line/80 bg-surface/50 sm:h-16">
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-line"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>
      <div
        className="absolute top-1/2 flex -translate-y-1/2 items-center gap-1 transition-[left] duration-75 ease-out"
        style={{
          left: `calc(${Math.min(100, position)}% - 1.25rem)`,
        }}
      >
        <span
          className="grid size-10 place-items-center rounded-lg text-xs font-black text-ink shadow-lg sm:size-11"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
