"use client";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Audience } from "@/components/site/audience";
import { Programs } from "@/components/site/programs";
import { Certificates } from "@/components/site/certificates";
import { Testimonials } from "@/components/site/testimonials";
import { ArticleTeaser } from "@/components/site/article-teaser";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { LocaleProvider, useLocale } from "@/lib/i18n/locale";
import { whatsappLink } from "@/lib/whatsapp";
import type { SiteContent } from "@/lib/types";

type HomePageProps = {
  contentHe: SiteContent;
  contentEn: SiteContent;
};

function HomePageInner() {
  const { content, ui } = useLocale();
  const whatsappHref = whatsappLink(
    content.contact.whatsappNumber,
    ui.whatsappDefault,
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip">
        <Hero hero={content.hero} whatsappHref={whatsappHref} />
        <About about={content.about} />
        <Audience audience={content.audience} />
        <Programs
          programs={content.programs}
          whatsappNumber={content.contact.whatsappNumber}
        />
        <Certificates certificates={content.certificates} />
        <Testimonials testimonials={content.testimonials} />
        <ArticleTeaser articles={content.articles} />
        <Faq faq={content.faq} />
        <Contact
          contact={content.contact}
          programNames={content.programs.items.map((program) => program.name)}
        />
      </main>
      <Footer content={content} />
      <WhatsappFab href={whatsappHref} />
    </>
  );
}

export function HomePage({ contentHe, contentEn }: HomePageProps) {
  return (
    <LocaleProvider contentHe={contentHe} contentEn={contentEn}>
      <HomePageInner />
    </LocaleProvider>
  );
}
