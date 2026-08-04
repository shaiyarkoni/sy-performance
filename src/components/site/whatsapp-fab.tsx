import { WhatsappIcon } from "./social-icons";

export function WhatsappFab({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעה בוואטסאפ"
      className="fixed bottom-6 start-6 z-40 grid size-14 place-items-center rounded-full bg-volt text-ink shadow-[0_10px_40px_-8px_rgba(198,248,51,0.65)] transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
