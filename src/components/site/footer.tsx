import Link from "next/link";
import { Settings } from "lucide-react";
import { Brand } from "./brand";
import { socialMeta } from "./social-icons";
import type { SiteContent, SocialPlatform } from "@/lib/types";

const navLinks = [
  { href: "/#about", label: "מי אני" },
  { href: "/#audience", label: "למי זה מתאים" },
  { href: "/#programs", label: "מסלולים" },
  { href: "/#certificates", label: "תעודות" },
  { href: "/#testimonials", label: "ממליצים" },
  { href: "/#article", label: "מאמר" },
  { href: "/#faq", label: "שאלות ותשובות" },
  { href: "/#contact", label: "צור קשר" },
];

export function Footer({ content }: { content: SiteContent }) {
  const activeSocials = (
    Object.entries(content.contact.socials) as [SocialPlatform, string][]
  ).filter(([, url]) => url.trim());

  return (
    <footer className="border-t border-line bg-ink">
      <div className="shell grid gap-10 py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
            {content.brand.tagline}. {content.contact.location}.
          </p>
        </div>

        <nav>
          <h2 className="text-sm font-bold tracking-[0.18em] text-volt uppercase">
            ניווט
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {navLinks.map((link) => (
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
            <h2 className="text-sm font-bold tracking-[0.18em] text-volt uppercase">
              רשתות
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
        <div className="shell flex items-center justify-between gap-4 py-5">
          <p className="text-xs text-fog">
            © {new Date().getFullYear()} {content.brand.name}. כל הזכויות
            שמורות.
          </p>
          <Link
            href="/admin"
            aria-label="כניסה לניהול האתר"
            title="ניהול האתר"
            className="text-fog/40 transition-colors hover:text-volt"
          >
            <Settings className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
