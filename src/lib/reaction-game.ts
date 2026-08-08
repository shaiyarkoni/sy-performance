export type ReactionPersonalBest = {
  score: number;
  avgMs: number;
  peakMs: number;
  accuracy: number;
  updatedAt: string;
};

const STORAGE_KEY = "sy_reaction_personal_best";

export function loadPersonalBest(): ReactionPersonalBest | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReactionPersonalBest;
  } catch {
    return null;
  }
}

export function savePersonalBestIfBetter(stats: {
  score: number;
  avgMs: number;
  peakMs: number;
  accuracy: number;
}): ReactionPersonalBest | null {
  const prev = loadPersonalBest();
  const beatScore = !prev || stats.score > prev.score;
  if (!beatScore) return prev;

  const next: ReactionPersonalBest = {
    ...stats,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

/** Final score bands — 5,000+ is «מצויין». */
export type PerformanceTier =
  | "excellent"
  | "veryGood"
  | "good"
  | "average"
  | "developing"
  | "needsWork";

const TIER_MIN_SCORE: Record<PerformanceTier, number> = {
  excellent: 5000,
  veryGood: 4000,
  good: 3000,
  average: 2000,
  developing: 1000,
  needsWork: 0,
};

export function getPerformanceTier(score: number): PerformanceTier {
  if (score >= TIER_MIN_SCORE.excellent) return "excellent";
  if (score >= TIER_MIN_SCORE.veryGood) return "veryGood";
  if (score >= TIER_MIN_SCORE.good) return "good";
  if (score >= TIER_MIN_SCORE.average) return "average";
  if (score >= TIER_MIN_SCORE.developing) return "developing";
  return "needsWork";
}

export function nextTierMinScore(tier: PerformanceTier): number | null {
  switch (tier) {
    case "needsWork":
      return TIER_MIN_SCORE.developing;
    case "developing":
      return TIER_MIN_SCORE.average;
    case "average":
      return TIER_MIN_SCORE.good;
    case "good":
      return TIER_MIN_SCORE.veryGood;
    case "veryGood":
      return TIER_MIN_SCORE.excellent;
    default:
      return null;
  }
}

function formatScore(n: number): string {
  return n.toLocaleString("he-IL");
}

export function tierLabel(tier: PerformanceTier): string {
  switch (tier) {
    case "excellent":
      return "מצויין";
    case "veryGood":
      return "טוב מאוד";
    case "good":
      return "טוב";
    case "average":
      return "בינוני";
    case "developing":
      return "מתפתח";
    default:
      return "יש מקום לשיפור";
  }
}

export function tierFeedback(
  tier: PerformanceTier,
  score: number,
  avgMs: number,
  accuracy: number,
): { headline: string; tips: string[] } {
  const acc = accuracy.toFixed(0);
  const nextMin = nextTierMinScore(tier);
  const gap =
    nextMin === null ? 0 : Math.max(0, nextMin - score);

  switch (tier) {
    case "excellent":
      return {
        headline: `מצויין — ניקוד ${formatScore(score)} (5,000+). ביצועים ברמה גבוהה מאוד.`,
        tips: [
          "שמור על אותו קצב גם תחת עומס — זה מה שמפריד בין טוב למצויין באימון אמיתי.",
          "נסה לשבור שיא אישי בלי לרדת מתחת ל-90% דיוק.",
          avgMs > 300
            ? "הניקוד גבוה; אפשר עוד לחדד ממוצע ms לתגובות עוד יותר חדות."
            : "זמן תגובה ודיוק מדויקים — המשך אימוני ריכוז קצרים לפני אימון כוח.",
        ],
      };
    case "veryGood":
      return {
        headline: `טוב מאוד — ${formatScore(score)} נקודות. עוד מעט «מצויין».`,
        tips: [
          `עוד ${formatScore(gap)} נקודות ל-5,000 — התמקד בסיבובים מהירים בלי טעויות (-80).`,
          accuracy < 88
            ? `דיוק ${acc}% — פחות טעויות יעלו אותך ל«מצויין» מהר יותר ממהירות גולמית.`
            : "שמור על הדיוק וקצר את ממוצע התגובה ב-30–50ms בכל סיבוב.",
          "מבט רך על כל הלוח — החריג «קופץ» בפריפריה לפני שאתה לוחץ.",
        ],
      };
    case "good":
      return {
        headline: `טוב — ${formatScore(score)} נקודות. בסיס חזק לקראת «טוב מאוד» (4,000+).`,
        tips: [
          gap > 0
            ? `יעד קרוב: ${formatScore(nextMin!)} — שרשרת של 6–8 פגיעות נכונות ברצף.`
            : "המשך לשמור על קצב יציב.",
          accuracy < 80
            ? `דיוק ${acc}% — כל טעות פוגעת בניקוד; עדיף לוודא ואז ללחוץ.`
            : "הדיוק בסדר — עכשיו תעלה קצב: ממוצע תגובה מתחת ל-380ms.",
          avgMs > 450
            ? "חימום: 10 לחיצות על 1–9 לפני המבחן — האצבעות «יודעות» את הלוח."
            : "נסה 5 פגיעות רצופות בלי טעות — זה מקפיץ את הניקוד מהר.",
        ],
      };
    case "average":
      return {
        headline: `בינוני — ${formatScore(score)} נקודות. במסלול ל«טוב» (3,000+).`,
        tips: [
          gap > 0
            ? `חסרים ${formatScore(gap)} נקודות לרמת «טוב» — פחות טעויות, יותר סיבובים שהושלמו.`
            : "המשך לעבוד על עקביות.",
          "הנח אצבעות על 1–9 כמו במקלדת — פחות זמן חיפוש, יותר זיהוי.",
          accuracy < 72
            ? `דיוק ${acc}% — תאט מעט; פגיעה נכונה שווה יותר מלחיצה מהירה על מקש שגוי.`
            : "שפר דיוק קודם, ואז הוסף מהירות סיבוב אחר סיבוב.",
        ],
      };
    case "developing":
      return {
        headline: `מתפתח — ${formatScore(score)} נקודות. כיוון ל«בינוני» (2,000+).`,
        tips: [
          gap > 0
            ? `מטרה: ${formatScore(nextMin!)} — שלוש פגיעות נכונות ברצף, בלי לחץ מיותר.`
            : "שמור על עקביות בין ניסיונות.",
          "זהה קודם איזו ספרה שונה — רק אז לחץ (עכבר או מקלדת).",
          "טעות = -80 נקודות — עדיף חצי שנייה נוספת מאשר לחיצה שגויה.",
        ],
      };
    default:
      return {
        headline: `יש מקום לשיפור — ${formatScore(score)} נקודות. צעד ראשון: 1,000+.`,
        tips: [
          "לחץ רק כשהספרות דלוקות — על החריגה בצבע השונה.",
          gap > 0
            ? `יעד ראשון: ${formatScore(TIER_MIN_SCORE.developing)} נקודות עם דיוק מעל 55%.`
            : "נסה שוב מיד — הקצב משתפר מהר עם תרגול.",
          "אל תלחץ בכל הופעה; סיבוב נכון אחד עדיף על שלושה מהירים ושגויים.",
          score <= 0
            ? "אם הניקוד 0 — ודא שהגעת לשלב «משחק» אחרי הספירה 3-2-1."
            : "שינה, מים וחימום קל לפני המבחן משפיעים על זמן התגובה.",
        ],
      };
  }
}

/** PC numpad layout: index 0–8 → digit shown on key (row-major, LTR). */
export const NUMPAD_DIGITS = [7, 8, 9, 4, 5, 6, 1, 2, 3] as const;

export const NUMPAD_ROWS: readonly (readonly number[])[] = [
  [7, 8, 9],
  [4, 5, 6],
  [1, 2, 3],
];

export function digitKeyToIndex(digit: number): number | null {
  const i = NUMPAD_DIGITS.indexOf(digit as (typeof NUMPAD_DIGITS)[number]);
  return i >= 0 ? i : null;
}
