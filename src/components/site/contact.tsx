"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { WhatsappIcon, socialMeta } from "./social-icons";
import { useLocale } from "@/lib/i18n/locale";
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
  const { ui } = useLocale();
  const copy = ui.contact;
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const update = (key: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError(copy.errorRequired);
      return;
    }

    const lines = [
      copy.whatsappLines.intro,
      "",
      `${copy.whatsappLines.name}: ${form.name.trim()}`,
      `${copy.whatsappLines.phone}: ${form.phone.trim()}`,
      form.age.trim()
        ? `${copy.whatsappLines.age}: ${form.age.trim()}`
        : "",
      form.sport.trim()
        ? `${copy.whatsappLines.sport}: ${form.sport.trim()}`
        : "",
      form.program ? `${copy.whatsappLines.program}: ${form.program}` : "",
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
    <section id="contact" className="section relative scroll-mt-28 bg-ink-soft pb-28 sm:pb-24">
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
                  <span className="text-sm font-medium">{copy.fullName}</span>
                  <input
                    className="field"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    autoComplete="name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">{copy.phone}</span>
                  <input
                    className="field"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">{copy.age}</span>
                  <input
                    className="field"
                    value={form.age}
                    onChange={(event) => update("age", event.target.value)}
                    inputMode="numeric"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">{copy.sport}</span>
                  <input
                    className="field"
                    value={form.sport}
                    onChange={(event) => update("sport", event.target.value)}
                    placeholder={copy.placeholders.sport}
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium">{copy.program}</span>
                <select
                  className="field"
                  value={form.program}
                  onChange={(event) => update("program", event.target.value)}
                >
                  <option value="">{copy.programDefault}</option>
                  {programNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">{copy.message}</span>
                <textarea
                  className="field min-h-28 resize-y"
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder={copy.placeholders.message}
                />
              </label>

              {error ? (
                <p className="text-sm font-medium text-red-400">{error}</p>
              ) : null}

              <button type="submit" className={buttonClass("volt", "lg")}>
                <Send className="size-4" />
                {copy.submit}
              </button>

              <p className="text-xs text-fog">{copy.submitNote}</p>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:pt-24">
          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
            <h3 className="text-lg font-black">{copy.directDetails}</h3>

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
                <h3 className="mt-8 text-lg font-black">{copy.followMe}</h3>
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
                copy.whatsappOpenDirect,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("outline", "lg", "mt-8 w-full")}
            >
              <WhatsappIcon className="size-4.5" />
              {copy.openWhatsapp}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
