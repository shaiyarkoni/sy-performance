import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SY Performance | אימוני כוח וביצועים לספורטאים",
    template: "%s | SY Performance",
  },
  description:
    "אימוני כוח, כושר, מהירות ושינוי כיוון לספורטאים מגיל 12 ומעלה. תוכנית אישית שבנויה על הענף שלך, על הגיל שלך ועל היעד שאתה רוצה להגיע אליו.",
  keywords: [
    "אימוני כוח",
    "אימוני ביצועים",
    "מאמן כושר לספורטאים",
    "שינוי כיוון",
    "מניעת פציעות",
    "אימון נוער",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "SY Performance",
    title: "SY Performance | אימוני כוח וביצועים לספורטאים",
    description:
      "אימוני כוח, כושר, מהירות ושינוי כיוון לספורטאים מגיל 12 ומעלה.",
    images: [
      {
        url: "/logo.png",
        width: 768,
        height: 384,
        alt: "SY Performance",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08090a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${heebo.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-clip antialiased">
        {children}
      </body>
    </html>
  );
}
