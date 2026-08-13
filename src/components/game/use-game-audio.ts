"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CROWD_SRC = "/sounds/crowd-ambient.mp3";
const SWISH_SRC = "/sounds/swish.mp3";
const BUZZER_SRC = "/sounds/buzzer.mp3";
const STORAGE_MUTE = "sy_reaction_mute";

function readMutedPreference(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_MUTE) === "1";
}

const CROWD_VOLUME = 0.5;

function absoluteSoundSrc(path: string): string {
  if (typeof window === "undefined") return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${window.location.origin}${normalized}`;
}

function configureLoop(audio: HTMLAudioElement) {
  audio.preload = "auto";
  audio.setAttribute("playsinline", "");
}

export function useGameAudio() {
  const crowdRef = useRef<HTMLAudioElement | null>(null);
  const swishRef = useRef<HTMLAudioElement | null>(null);
  const buzzerRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [muted, setMutedState] = useState(readMutedPreference);
  const [audioBlocked, setAudioBlocked] = useState(false);

  const ensureCrowd = useCallback(() => {
    if (!crowdRef.current) {
      const crowd = new Audio(absoluteSoundSrc(CROWD_SRC));
      crowd.loop = true;
      configureLoop(crowd);
      crowdRef.current = crowd;
    }
    return crowdRef.current;
  }, []);

  const ensureSwish = useCallback(() => {
    if (!swishRef.current) {
      const swish = new Audio(absoluteSoundSrc(SWISH_SRC));
      configureLoop(swish);
      swishRef.current = swish;
    }
    return swishRef.current;
  }, []);

  const ensureBuzzer = useCallback(() => {
    if (!buzzerRef.current) {
      const buzzer = new Audio(absoluteSoundSrc(BUZZER_SRC));
      configureLoop(buzzer);
      buzzerRef.current = buzzer;
    }
    return buzzerRef.current;
  }, []);

  useEffect(() => {
    mutedRef.current = readMutedPreference();
    ensureCrowd();
    ensureSwish();
    ensureBuzzer();
  }, [ensureBuzzer, ensureCrowd, ensureSwish]);

  const fadeCrowdTo = useCallback((target: number, ms: number) => {
    const crowd = crowdRef.current;
    if (!crowd) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);

    const start = crowd.volume;
    const steps = Math.max(1, Math.round(ms / 50));
    let step = 0;
    fadeTimerRef.current = setInterval(() => {
      step += 1;
      const t = step / steps;
      crowd.volume = start + (target - start) * t;
      if (step >= steps) {
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
        crowd.volume = target;
        if (target <= 0.001) {
          crowd.pause();
          crowd.currentTime = 0;
        }
      }
    }, ms / steps);
  }, []);

  /** Call synchronously from a click handler — do not await before play(). */
  const startArena = useCallback(() => {
    if (mutedRef.current) return;
    setAudioBlocked(false);
    const crowd = ensureCrowd();
    crowd.currentTime = 0;
    crowd.volume = 0.08;

    const playPromise = crowd.play();
    if (!playPromise) {
      crowd.volume = CROWD_VOLUME;
      return;
    }

    playPromise
      .then(() => {
        setAudioBlocked(false);
        fadeCrowdTo(CROWD_VOLUME, 1000);
      })
      .catch(() => {
        setAudioBlocked(true);
        crowd.pause();
        crowd.volume = 0;
      });
  }, [ensureCrowd, fadeCrowdTo]);

  const stopArena = useCallback(() => {
    fadeCrowdTo(0, 900);
  }, [fadeCrowdTo]);

  const playSwish = useCallback(() => {
    if (mutedRef.current) return;
    const s = ensureSwish();
    s.currentTime = 0;
    s.volume = 0.55;
    void s.play().catch(() => {});
  }, [ensureSwish]);

  const playMiss = useCallback(() => {
    if (mutedRef.current) return;
    const b = ensureBuzzer();
    b.currentTime = 0;
    b.volume = 0.42;
    b.playbackRate = 1.25;
    void b.play().catch(() => {});
    window.setTimeout(() => {
      b.pause();
      b.playbackRate = 1;
    }, 280);
  }, [ensureBuzzer]);

  const playBuzzer = useCallback(() => {
    if (mutedRef.current) return;
    const b = ensureBuzzer();
    b.playbackRate = 1;
    b.currentTime = 0;
    b.volume = 0.65;
    void b.play().catch(() => {});
  }, [ensureBuzzer]);

  const setMuted = useCallback((next: boolean) => {
    mutedRef.current = next;
    localStorage.setItem(STORAGE_MUTE, next ? "1" : "0");
    setMutedState(next);
    if (next) {
      setAudioBlocked(false);
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      const crowd = crowdRef.current;
      if (crowd) {
        crowd.pause();
        crowd.volume = 0;
      }
    }
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted(!mutedRef.current);
  }, [setMuted]);

  return {
    muted,
    audioBlocked,
    setMuted,
    toggleMuted,
    startArena,
    stopArena,
    playSwish,
    playMiss,
    playBuzzer,
  };
}
