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
    text: "חייבים לאכול חלבון תוך 30 דקות בדיוק אחרי אימון — אחרת השריר לא נבנה.",
    answerYes: false,
    explanation:
      '"חלון ההזדמנויות" האנבולי רחב בהרבה מ-30 דקות. הדבר החשוב ביותר לבניית שריר והתאוששות הוא כמות החלבון הכוללת וחלוקתה על פני כל היום.',
  },
  {
    id: "q2",
    level: "easy",
    text: "שינה לא מספקת יכולה לפגוע בביצועים, בהתאוששות ובמצב הרוח.",
    answerYes: true,
    explanation:
      "בזמן שינה עמוקה מופרש הורמון הגדילה והגוף משקם רקמות שריר ומערכות עצביות. שינה היא חלק בלתי נפרד מתוכנית האימונים.",
  },
  {
    id: "q3",
    level: "easy",
    text: "אימון כוח הופך שומן ישירות לרקמת שריר.",
    answerYes: false,
    explanation:
      "שומן ושריר הן שתי רקמות שונות לחלוטין. אי אפשר להפוך אחת לשנייה, אך אפשר לרדת במסת השומן ולעלות במסת השריר במקביל.",
  },
  {
    id: "q4",
    level: "easy",
    text: "לספורטאי צעיר שמתאמן ברציפות חשוב להקפיד על צריכת חלבון לאורך כל היום.",
    answerYes: true,
    explanation:
      "שילוב של גדילה טבעית לצד עומס אימונים יוצר דרישה גבוהה יותר לחלבון (יחסית למשקל הגוף) בהשוואה לאדם שאינו מתאמן.",
  },
  {
    id: "q5",
    level: "medium",
    text: "אותה ארוחה בדיוק בלילה תשמין יותר מאשר אם נאכל אותה בבוקר.",
    answerYes: false,
    explanation:
      "עלייה או ירידה במשקל נקבעות לפי סך הקלוריות היומי והשבועי, לא לפי השעה בשעון שבה אכלת.",
  },
  {
    id: "q6",
    level: "medium",
    text: "בימים חמים או באימון כפול — חובה לשתות מים מראש ולא לחכות לצמא.",
    answerYes: true,
    explanation:
      "מנגנון הצמא מגיב באיחור. ירידה קלה של 2% בנוזלי הגוף פוגעת מיד בכוח המתפרץ, בזמן התגובה ובסיבולת.",
  },
  {
    id: "q7",
    level: "medium",
    text: 'מוצר "דל שומן" תמיד בריא ומתאים יותר לספורטאי מהגרסה הרגילה.',
    answerYes: false,
    explanation:
      "כדי לפצות על הטעם שהולך לאיבוד בהסרת השומן, יצרנים מוסיפים לעיתים קרובות כמויות גדולות של סוכר ועמילנים. תמיד כדאי לבדוק את התווית.",
  },
  {
    id: "q8",
    level: "hard",
    text: "ספורטאי צעיר זקוק לפחות חלבון ביום מאדם בוגר שלא מתאמן.",
    answerYes: false,
    explanation:
      "להפך. ספורטאי פעיל בגיל הצמיחה זקוק ליותר חלבון לכל ק\"ג משקל גוף מאשר אדם מבוגר שאינו מבצע פעילות גופנית.",
  },
  {
    id: "q9",
    level: "hard",
    text: "אם אוכלים מספיק חלבון ביום — תוסף BCAA באימון כוח הוא חובה.",
    answerYes: false,
    explanation:
      "חלבון איכותי ומלא (כמו עוף, ביצים, מוצרי חלב או אבקת חלבון) כבר מכיל את כל חומצות האמינו החיוניות, ולכן אין צורך בתוספת BCAA נפרדת.",
  },
  {
    id: "q10",
    level: "hard",
    text: "כפיפות בטן ממוקדות שורפות שומן ספציפית באזור הבטן.",
    answerYes: false,
    explanation:
      "לא ניתן לשרוף שומן באופן נקודתי. שריפת שומן מתרחשת מכל הגוף כתוצאה מגרעון קלורי כולל, ותרגילי בטן רק מחזקים את השריר שמתחת לשומן.",
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
