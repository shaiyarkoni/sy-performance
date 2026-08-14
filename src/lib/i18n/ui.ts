export type Locale = "he" | "en";

export type UiCopy = {
  nav: { href: string; label: string }[];
  talkToMe: string;
  openMenu: string;
  closeMenu: string;
  testGame: string;
  whatsappDefault: string;
  whatsappFab: string;
  scrollDown: string;
  footerNav: string;
  footerSocial: string;
  footerRights: string;
  adminEntry: string;
  programsPopular: string;
  programsCta: string;
  programsWhatsapp: (programName: string) => string;
  articleReadMore: string;
  articleTeaserNote: string;
  gameHub: {
    eyebrow: string;
    heading: string;
    subheading: string;
  };
  contact: {
    fullName: string;
    phone: string;
    age: string;
    sport: string;
    program: string;
    message: string;
    programDefault: string;
    submit: string;
    submitNote: string;
    directDetails: string;
    followMe: string;
    openWhatsapp: string;
    errorRequired: string;
    whatsappIntro: string;
    whatsappOpenDirect: string;
    placeholders: {
      phone: string;
      age: string;
      sport: string;
      message: string;
    };
    whatsappLines: {
      intro: string;
      name: string;
      phone: string;
      age: string;
      sport: string;
      program: string;
    };
  };
};

export const UI: Record<Locale, UiCopy> = {
  he: {
    nav: [
      { href: "#about", label: "מי אני" },
      { href: "#audience", label: "למי זה מתאים" },
      { href: "#programs", label: "מסלולים" },
      { href: "#certificates", label: "תעודות" },
      { href: "#testimonials", label: "ממליצים" },
      { href: "#article", label: "מאמר" },
      { href: "#faq", label: "שאלות ותשובות" },
      { href: "#contact", label: "צור קשר" },
    ],
    talkToMe: "דברו איתי",
    openMenu: "פתיחת תפריט",
    closeMenu: "סגירת תפריט",
    testGame: "TEST GAME",
    whatsappDefault:
      "היי שי, הגעתי דרך האתר ואשמח לשמוע פרטים על האימונים.",
    whatsappFab: "שליחת הודעה בוואטסאפ",
    scrollDown: "גלול למטה",
    footerNav: "ניווט",
    footerSocial: "רשתות",
    footerRights: "כל הזכויות שמורות.",
    adminEntry: "ניהול האתר",
    programsPopular: "הכי פופולרי",
    programsCta: "מתעניין במסלול",
    programsWhatsapp: (programName) =>
      `היי, אני מתעניין במסלול "${programName}" שראיתי באתר. אפשר פרטים?`,
    articleReadMore: "מעבר למאמר מלא",
    articleTeaserNote: "הצצה באתר · המשך בוואטסאפ",
    gameHub: {
      eyebrow: "TEST GAME",
      heading: "בחר משחק",
      subheading: "Ring Reaction ו-Myth Check — אתגרי קצב, תגובה וידע.",
    },
    contact: {
      fullName: "שם מלא *",
      phone: "טלפון *",
      age: "גיל",
      sport: "ענף ספורט",
      program: "מסלול שמעניין אותך",
      message: "משהו שכדאי שאדע?",
      programDefault: "עוד לא בטוח, נדבר על זה",
      submit: "שליחה בוואטסאפ",
      submitNote: "הכפתור פותח את וואטסאפ עם ההודעה כבר מוכנה. אתה רק לוחץ שלח.",
      directDetails: "פרטים ישירים",
      followMe: "עקוב אחריי",
      openWhatsapp: "פתח וואטסאפ ישירות",
      errorRequired: "צריך לפחות שם וטלפון כדי שאוכל לחזור אליך",
      whatsappIntro: "היי שי, הגעתי דרך האתר.",
      whatsappOpenDirect:
        "היי שי, הגעתי דרך האתר ואשמח לשמוע פרטים על האימונים.",
      placeholders: {
        phone: "לדוגמה 050-000-0000",
        age: "לדוגמה 15",
        sport: "כדורסל, כדורגל, אתלטיקה...",
        message: "פציעות בעבר, יעדים לעונה, זמינות לאימונים...",
      },
      whatsappLines: {
        intro: "היי שי, הגעתי דרך האתר.",
        name: "שם",
        phone: "טלפון",
        age: "גיל",
        sport: "ענף ספורט",
        program: "מסלול שמעניין אותי",
      },
    },
  },
  en: {
    nav: [
      { href: "#about", label: "About" },
      { href: "#audience", label: "Who it's for" },
      { href: "#programs", label: "Programs" },
      { href: "#certificates", label: "Credentials" },
      { href: "#testimonials", label: "Testimonials" },
      { href: "#article", label: "Article" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact" },
    ],
    talkToMe: "Talk to me",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    testGame: "TEST GAME",
    whatsappDefault:
      "Hi Shai, I came through your website and would love details about training.",
    whatsappFab: "Send a WhatsApp message",
    scrollDown: "Scroll down",
    footerNav: "Navigation",
    footerSocial: "Social",
    footerRights: "All rights reserved.",
    adminEntry: "Site admin",
    programsPopular: "Most popular",
    programsCta: "Interested in this plan",
    programsWhatsapp: (programName) =>
      `Hi, I'm interested in the "${programName}" plan I saw on the website. Can you share details?`,
    articleReadMore: "Read full article",
    articleTeaserNote: "Preview on site · Continue on WhatsApp",
    gameHub: {
      eyebrow: "TEST GAME",
      heading: "Pick a game",
      subheading: "Ring Reaction and Myth Check — speed, reflex, and knowledge challenges.",
    },
    contact: {
      fullName: "Full name *",
      phone: "Phone *",
      age: "Age",
      sport: "Sport",
      program: "Program you're interested in",
      message: "Anything I should know?",
      programDefault: "Not sure yet — let's talk",
      submit: "Send on WhatsApp",
      submitNote:
        "This opens WhatsApp with your message ready. You just tap send.",
      directDetails: "Direct details",
      followMe: "Follow me",
      openWhatsapp: "Open WhatsApp directly",
      errorRequired: "Please add at least your name and phone so I can reply.",
      whatsappIntro: "Hi Shai, I came through your website.",
      whatsappOpenDirect:
        "Hi Shai, I came through your website and would love details about training.",
      placeholders: {
        phone: "e.g. 050-000-0000",
        age: "e.g. 15",
        sport: "Basketball, football, athletics...",
        message: "Past injuries, season goals, training availability...",
      },
      whatsappLines: {
        intro: "Hi Shai, I came through your website.",
        name: "Name",
        phone: "Phone",
        age: "Age",
        sport: "Sport",
        program: "Program I'm interested in",
      },
    },
  },
};

export const LOCALE_STORAGE_KEY = "sy-locale";
