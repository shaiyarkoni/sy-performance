"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { Brand } from "./brand";
import { LanguageToggle } from "./language-toggle";
import { socialMeta } from "./social-icons";
import { useLocale } from "@/lib/i18n/locale";
import type { SiteContent, SocialPlatform } from "@/lib/types";

export function Footer({ content }: { content: SiteContent }) {
  const { ui } = useLocale();
  const activeSocials = (
    Object.entries(content.contact.socials) as [SocialPlatform, string][]
  ).filter(([, url]) => url.trim());

  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell grid gap-10 py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
        <div>
          <Brand frame="tile" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
            {content.brand.tagline}. {content.contact.location}.
          </p>
        </div>

        <nav>
          <h2 className="text-sm font-bold tracking-[0.18em] text-accent-cool uppercase">
            {ui.footerNav}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {ui.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-fog transition-colors hover:text-chalk"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {activeSocials.length > 0 ? (
          <div>
            <h2 className="text-sm font-bold tracking-[0.18em] text-accent-cool uppercase">
              {ui.footerSocial}
            </h2>
            <div className="mt-4 flex gap-2.5">
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
                    className="grid size-10 place-items-center rounded-full border border-line text-fog transition-all hover:-translate-y-0.5 hover:border-volt hover:text-volt"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs leading-relaxed text-fog">
              © {new Date().getFullYear()} {content.brand.name}. {ui.footerRights}
            </p>
            <LanguageToggle />
          </div>
          <Link
            href="/admin"
            aria-label={ui.adminEntry}
            title={ui.adminEntry}
            className="text-fog/40 transition-colors hover:text-volt"
          >
            <Settings className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}