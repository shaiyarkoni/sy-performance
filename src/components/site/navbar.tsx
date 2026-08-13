"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Brand } from "./brand";
import { LanguageToggle } from "./language-toggle";
import { NavGameLink } from "./nav-game-link";
import { buttonClass } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale";

export function Navbar() {
  const { ui } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`site-header-bar fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex min-h-14 items-center justify-between gap-2 py-2 lg:min-h-16 lg:gap-6 lg:py-4">
          <a href="#top" className="min-w-0 shrink">
            <span className="lg:hidden">
              <Brand compact />
            </span>
            <span className="hidden lg:inline-flex">
              <Brand />
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {ui.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-fog transition-colors hover:text-chalk after:absolute after:-bottom-1.5 after:inset-x-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-volt after:transition-transform hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3"
            style={{ direction: "ltr" }}
          >
            <NavGameLink className="hidden lg:inline-flex" />
            <a
              href="#contact"
              className={buttonClass("volt", "md", "hidden lg:inline-flex")}
            >
              {ui.talkToMe}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={ui.openMenu}
              className="grid size-10 place-items-center rounded-full border border-line text-chalk transition-colors hover:border-volt hover:text-volt lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 flex flex-col bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="site-header-bar shell flex min-h-14 shrink-0 items-center justify-between py-2">
              <Brand compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={ui.closeMenu}
                className="grid size-10 place-items-center rounded-full border border-line text-chalk transition-colors hover:border-volt hover:text-volt"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="shell min-h-0 flex-1 overflow-y-auto overscroll-contain mt-4 flex flex-col gap-1 pb-8">
              {ui.nav.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 text-2xl font-bold text-chalk transition-colors hover:text-volt"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="shell shrink-0 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 flex flex-col gap-3">
              <div className="flex justify-center">
                <LanguageToggle />
              </div>
              <Link
                href="/game"
                onClick={() => setOpen(false)}
                className={buttonClass("outline", "lg", "w-full")}
              >
                {ui.testGame}
              </Link>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className={buttonClass("volt", "lg", "w-full")}
              >
                {ui.talkToMe}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
