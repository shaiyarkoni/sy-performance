"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  Award,
  Building2,
  Check,
  Dumbbell,
  ExternalLink,
  FileText,
  Flame,
  HelpCircle,
  Loader2,
  LogOut,
  MessageSquareQuote,
  Phone,
  User,
  Users,
} from "lucide-react";
import { logout, saveContent } from "@/app/admin/actions";
import { Brand } from "@/components/site/brand";
import { buttonClass } from "@/components/ui/button";
import {
  AboutPanel,
  ArticlesPanel,
  AudiencePanel,
  BrandPanel,
  CertificatesPanel,
  ContactPanel,
  FaqPanel,
  HeroPanel,
  ProgramsPanel,
  TestimonialsPanel,
} from "./panels";
import type { SiteContent } from "@/lib/types";

const tabs = [
  { id: "hero", label: "מסך פתיחה", Icon: Flame },
  { id: "about", label: "מי אני", Icon: User },
  { id: "audience", label: "למי זה מתאים", Icon: Users },
  { id: "programs", label: "מסלולים", Icon: Dumbbell },
  { id: "certificates", label: "תעודות", Icon: Award },
  { id: "testimonials", label: "ממליצים", Icon: MessageSquareQuote },
  { id: "articles", label: "מאמרים", Icon: FileText },
  { id: "faq", label: "שאלות ותשובות", Icon: HelpCircle },
  { id: "contact", label: "צור קשר", Icon: Phone },
  { id: "brand", label: "פרטי המותג", Icon: Building2 },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContentEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState(initial);
  const [baseline, setBaseline] = useState(() => JSON.stringify(initial));
  const [tab, setTab] = useState<TabId>("hero");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, startSaving] = useTransition();

  const dirty = JSON.stringify(content) !== baseline;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
    setMessage("");
    setError("");
  }

  function handleSave() {
    startSaving(async () => {
      const snapshot = JSON.stringify(content);
      const result = await saveContent(content);

      if (result.ok) {
        setBaseline(snapshot);
        setMessage("השינויים נשמרו ומופיעים באתר");
        setError("");
      } else {
        setError(result.error);
        setMessage("");
      }
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="site-header-bar sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-xl">
        <div className="shell flex min-h-14 items-center justify-between gap-2 py-2.5 sm:min-h-16 sm:gap-4 sm:py-4">
          <div className="flex items-center gap-4">
            <Brand compact />
            <span className="hidden text-sm text-fog sm:inline">
              ניהול תוכן
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className={buttonClass("outline", "md")}
            >
              <ExternalLink className="size-4" />
              <span className="hidden sm:inline">צפייה באתר</span>
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="grid size-10 place-items-center rounded-full border border-line text-fog transition-colors hover:border-red-500/60 hover:text-red-400"
                aria-label="יציאה"
                title="יציאה"
              >
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="shell flex-1 py-8">
        <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
          <nav className="lg:sticky lg:top-26 lg:self-start">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {tabs.map(({ id, label, Icon }) => (
                <li key={id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setTab(id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-colors ${
                      tab === id
                        ? "border-volt bg-volt/10 text-volt"
                        : "border-line text-fog hover:border-volt/40 hover:text-chalk"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-5 pb-24">
            {tab === "hero" ? (
              <HeroPanel
                value={content.hero}
                onChange={(value) => set("hero", value)}
              />
            ) : null}
            {tab === "about" ? (
              <AboutPanel
                value={content.about}
                onChange={(value) => set("about", value)}
              />
            ) : null}
            {tab === "audience" ? (
              <AudiencePanel
                value={content.audience}
                onChange={(value) => set("audience", value)}
              />
            ) : null}
            {tab === "programs" ? (
              <ProgramsPanel
                value={content.programs}
                onChange={(value) => set("programs", value)}
              />
            ) : null}
            {tab === "certificates" ? (
              <CertificatesPanel
                value={content.certificates}
                onChange={(value) => set("certificates", value)}
              />
            ) : null}
            {tab === "testimonials" ? (
              <TestimonialsPanel
                value={content.testimonials}
                onChange={(value) => set("testimonials", value)}
              />
            ) : null}
            {tab === "articles" ? (
              <ArticlesPanel
                value={content.articles}
                onChange={(value) => set("articles", value)}
              />
            ) : null}
            {tab === "faq" ? (
              <FaqPanel
                value={content.faq}
                onChange={(value) => set("faq", value)}
              />
            ) : null}
            {tab === "contact" ? (
              <ContactPanel
                value={content.contact}
                onChange={(value) => set("contact", value)}
              />
            ) : null}
            {tab === "brand" ? (
              <BrandPanel
                value={content.brand}
                onChange={(value) => set("brand", value)}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/92 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-xl">
        <div className="shell flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5">
          <p className="text-xs sm:text-sm">
            {error ? (
              <span className="text-red-400">{error}</span>
            ) : message ? (
              <span className="inline-flex items-center gap-1.5 text-volt">
                <Check className="size-4" />
                {message}
              </span>
            ) : dirty ? (
              <span className="text-fog">יש שינויים שלא נשמרו</span>
            ) : (
              <span className="text-fog">הכל שמור</span>
            )}
          </p>

          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || saving}
            className={buttonClass("volt", "md", "w-full sm:w-auto")}
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : null}
            {saving ? "שומר..." : "שמור שינויים"}
          </button>
        </div>
      </div>
    </div>
  );
}
