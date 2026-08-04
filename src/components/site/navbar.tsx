"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { buttonClass } from "@/components/ui/button";

const links = [
  { href: "#about", label: "מי אני" },
  { href: "#audience", label: "למי זה מתאים" },
  { href: "#programs", label: "מסלולים" },
  { href: "#certificates", label: "תעודות" },
  { href: "#testimonials", label: "ממליצים" },
  { href: "#article", label: "מאמר" },
];

export function Navbar({ whatsappHref }: { whatsappHref: string }) {
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-18 items-center justify-between gap-6 py-4">
          <a href="#top" className="shrink-0">
            <Brand />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
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

          <div className="flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("volt", "md", "hidden sm:inline-flex")}
            >
              דברו איתי
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="פתיחת תפריט"
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
            className="fixed inset-0 z-60 bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex h-18 items-center justify-between py-4">
              <Brand />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגירת תפריט"
                className="grid size-10 place-items-center rounded-full border border-line text-chalk transition-colors hover:border-volt hover:text-volt"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="shell mt-6 flex flex-col gap-1">
              {links.map((link, index) => (
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

            <div className="shell mt-8">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("volt", "lg", "w-full")}
              >
                דברו איתי בוואטסאפ
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
