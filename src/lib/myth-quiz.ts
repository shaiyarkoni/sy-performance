import { MYTH_QUIZ_QUESTIONS_EXTRA } from "./myth-quiz-extra";

export type MythQuestion = {
  id: string;
  text: string;
  /** true = כן נכון, false = לא נכון */
  answerYes: boolean;
  explanation: string;
  level: "easy" | "medium" | "hard";
};

export const MYTH_QUIZ_QUESTIONS: MythQuestion[] = [
  {
    id: "q1",
    level: "easy",
    text: "חייבים לאכול חלבון תוך 30 דקות אחרי אימון — אחרת השריר «לא נבנה».",
    answerYes: false,
    explanation:
      "חלון אנבולי קיים, אבל לא כל כך צר מדי. עד שעות אחרי אימון חלבון וארוחה מספקים עדיין תמיכה טובה — עקביות יומית חשובה יותר מ-30 דקות בדיוק.",
  },
  {
    id: "q2",
    level: "easy",
    text: "שינה לא מספקת יכולה לפגוע בביצועים, בהתאוששות ובמצב רוח.",
    answerYes: true,
    explanation:
      "נכון. שינה היא חלק מהתאוששות — לא «בונוס». חוסר שינה פוגע בעומסי אימון, בתיאבון ובסיכון לפציעה.",
  },
  {
    id: "q3",
    level: "easy",
    text: "אימון כוח הופך שומן גוף ישירות לשריר.",
    answerYes: false,
    explanation:
      "שומן ושריר הם רקמות שונות — אי אפשר «להפוך» אחת לשנייה. אימון כוח בונה/שומר שריר; ירידה בשומן קשורה בעיקר לאיזון אנרגטי לאורך זמן.",
  },
  {
    id: "q4",
    level: "easy",
    text: "לספורטאי צעיר שמתאמן ברציפות חשוב לשים לב לצריכת חלבון מספקת לאורך היום.",
    answerYes: true,
    explanation:
      "נכון. בגיל צמיחה + עומס אימונים הצרכים לרוב גבוהים יחסית למשקל — לא חייבים תוספים, אבל כן מזון איכותי וחלבון במקומות הנכונים.",
  },
  {
    id: "q5",
    level: "medium",
    text: "אותה ארוחה בדיוק בלילה מאוחר «מעבה» יותר מאשר באותה ארוחה בבוקר.",
    answerYes: false,
    explanation:
      "לרוב האנשים המשקל נקבע מסך קלורי ועקביות — לא משעון. תזמון ארוחות יכול לעזור לשינה ולביצועים, אבל לא «קסם» שומן רק בערב.",
  },
  {
    id: "q6",
    level: "medium",
    text: "בימים חמים או עם אימון כפול — חשוב להקפיד על שתייה ולא «לסבול צמא».",
    answerYes: true,
    explanation:
      "נכון. התייבשות קלה כבר מורגשת בביצועים. שקילה לפני/אחרי, צבע שתן ושתייה מסודרת עדיפים על כלל מספר קבוע לכולם.",
  },
  {
    id: "q7",
    level: "medium",
    text: "מוצר «דל שומן» תמיד בריא ומתאים יותר לספורטאי מהגרסה הרגילה.",
    answerYes: false,
    explanation:
      "לעיתים מורידים שומן ומעלים סוכר/מלח. חשוב לקרוא תווית — לא שם המוצר על האריזה.",
  },
  {
    id: "q8",
    level: "hard",
    text: "ספורטאי בגיל בית ספר צריך פחות חלבון ביום מאדם בוגר שלא מתאמן.",
    answerYes: false,
    explanation:
      "ילדים ונוער פעילים, במיוחד בתקופות צמיחה ועומס אימונים, לרוב זקוקים ליותר חלבון (לק\"ג) מאשר מבוגר יושב.",
  },
  {
    id: "q9",
    level: "hard",
    text: "אם אוכלים מספיק חלבון יומי — BCAA בזמן אימון כוח חיוניים למניעת פירוק שריר.",
    answerYes: false,
    explanation:
      "עם חלבון מספיק (כולל מקורות מלאים), תוספת BCAA לרוב לא מוסיפה הרבה. חלבון סביב האימון והיום — קודם כל.",
  },
  {
    id: "q10",
    level: "hard",
    text: "אימוני בטן ממוקדים «שורפים» שומן באזור הבטן יותר מאזורים אחרים.",
    answerYes: false,
    explanation:
      "אין הוכחה ל«ירידת שומן» ממוקדת באזור. בטן חזקה כן חשובה — אבל crunches לבד לא מורידים שומן רק בבטן.",
  },
];

export const MYTH_QUIZ_BANK: MythQuestion[] = [
  ...MYTH_QUIZ_QUESTIONS,
  ...MYTH_QUIZ_QUESTIONS_EXTRA,
];

const LEVEL_ORDER: Record<MythQuestion["level"], number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** 10 random questions from the full bank, roughly balanced by difficulty. */
export function pickQuizRound(count = 10): MythQuestion[] {
  const target = Math.min(count, MYTH_QUIZ_BANK.length);
  const easy = shuffle(MYTH_QUIZ_BANK.filter((q) => q.level === "easy"));
  const medium = shuffle(MYTH_QUIZ_BANK.filter((q) => q.level === "medium"));
  const hard = shuffle(MYTH_QUIZ_BANK.filter((q) => q.level === "hard"));

  const wantEasy = Math.min(easy.length, Math.round(target * 0.35));
  const wantHard = Math.min(hard.length, Math.round(target * 0.25));
  const wantMedium = Math.min(
    medium.length,
    Math.max(0, target - wantEasy - wantHard),
  );

  let picked = [
    ...easy.slice(0, wantEasy),
    ...medium.slice(0, wantMedium),
    ...hard.slice(0, wantHard),
  ];

  if (picked.length < target) {
    const used = new Set(picked.map((q) => q.id));
    const rest = shuffle(MYTH_QUIZ_BANK.filter((q) => !used.has(q.id)));
    picked = [...picked, ...rest.slice(0, target - picked.length)];
  }

  return picked.sort(
    (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level],
  );
}

export function mythQuizScoreLabel(correct: number, total: number): string {
  const pct = total === 0 ? 0 : (correct / total) * 100;
  if (pct >= 90) return "מצויין — יש לך ידע מוצק, עוזר לא להיתבלבל ממיתוסים.";
  if (pct >= 70) return "טוב מאוד — כמה מוקשים קטנים, שווה לחזור על ההסברים.";
  if (pct >= 50) return "בסיס סביר — עוד קצת ותסנן רעש ברשת ובחדר כושר.";
  return "יש מקום לחיזוק — קרא את ההסברים; זה בדיוק מה שהשאלון נועד לבדוק.";
}
