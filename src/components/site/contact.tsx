"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { WhatsappIcon, socialMeta } from "./social-icons";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteContent, SocialPlatform } from "@/lib/types";

type ContactProps = {
  contact: SiteContent["contact"];
  programNames: string[];
};

const emptyForm = {
  name: "",
  phone: "",
  age: "",
  sport: "",
  program: "",
  message: "",
};

export function Contact({ contact, programNames }: ContactProps) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const update = (key: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("צריך לפחות שם וטלפון כדי שאוכל לחזור אליך");
      return;
    }

    const lines = [
      "היי שי, הגעתי דרך האתר.",
      "",
      `שם: ${form.name.trim()}`,
      `טלפון: ${form.phone.trim()}`,
      form.age.trim() ? `גיל: ${form.age.trim()}` : "",
      form.sport.trim() ? `ענף ספורט: ${form.sport.trim()}` : "",
      form.program ? `מסלול שמעניין אותי: ${form.program}` : "",
      form.message.trim() ? `\n${form.message.trim()}` : "",
    ].filter(Boolean);

    window.open(
      whatsappLink(contact.whatsappNumber, lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const activeSocials = (
    Object.entries(contact.socials) as [SocialPlatform, string][]
  ).filter(([, url]) => url.trim());

  return (
    <section id="contact" className="section relative bg-ink-soft">
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="shell relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={contact.eyebrow}
            heading={contact.heading}
            subheading={contact.subheading}
          />

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="mt-9 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">שם מלא *</span>
                  <input
                    className="field"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="איך קוראים לך?"
                    autoComplete="name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">טלפון *</span>
                  <input
                    className="field"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="050-000-0000"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">גיל</span>
                  <input
                    className="field"
                    value={form.age}
                    onChange={(event) => update("age", event.target.value)}
                    placeholder="למשל 15"
                    inputMode="numeric"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">ענף ספורט</span>
                  <input
                    className="field"
                    value={form.sport}
                    onChange={(event) => update("sport", event.target.value)}
                    placeholder="כדורסל, כדורגל, אתלטיקה..."
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium">מסלול שמעניין אותך</span>
                <select
                  className="field"
                  value={form.program}
                  onChange={(event) => update("program", event.target.value)}
                >
                  <option value="">עוד לא בטוח, נדבר על זה</option>
                  {programNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">משהו שכדאי שאדע?</span>
                <textarea
                  className="field min-h-28 resize-y"
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder="פציעות בעבר, יעדים לעונה, זמינות לאימונים..."
                />
              </label>

              {error ? (
                <p className="text-sm font-medium text-red-400">{error}</p>
              ) : null}

              <button type="submit" className={buttonClass("volt", "lg")}>
                <Send className="size-4" />
                שליחה בוואטסאפ
              </button>

              <p className="text-xs text-fog">
                הכפתור פותח את וואטסאפ עם ההודעה כבר מוכנה. אתה רק לוחץ שלח.
              </p>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:pt-24">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-lg font-black">פרטים ישירים</h3>

            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={whatsappLink(contact.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-fog transition-colors hover:text-volt"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line">
                    <Phone className="size-4" />
                  </span>
                  <span dir="ltr">{contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-fog transition-colors hover:text-volt"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line">
                    <Mail className="size-4" />
                  </span>
                  <span dir="ltr">{contact.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-fog">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line">
                  <MapPin className="size-4" />
                </span>
                <span>{contact.location}</span>
              </li>
            </ul>

            {activeSocials.length > 0 ? (
              <>
                <h3 className="mt-8 text-lg font-black">עקוב אחריי</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {activeSocials.map(([platform, url]) => {
                    const { label, Icon } = socialMeta[platform];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="grid size-11 place-items-center rounded-full border border-line text-fog transition-all hover:-translate-y-0.5 hover:border-volt hover:text-volt"
                      >
                        <Icon className="size-4.5" />
                      </a>
                    );
                  })}
                </div>
              </>
            ) : null}

            <a
              href={whatsappLink(
                contact.whatsappNumber,
                "היי שי, הגעתי דרך האתר ואשמח לשמוע פרטים על האימונים.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("outline", "lg", "mt-8 w-full")}
            >
              <WhatsappIcon className="size-4.5" />
              פתח וואטסאפ ישירות
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
