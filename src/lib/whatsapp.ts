export function normalizeWhatsAppNumber(input: string): string {
  const digits = input
    .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
    .replace(/\D/g, "");

  if (!digits) return "";
  if (digits.startsWith("972")) return digits;
  if (digits.startsWith("0")) return `972${digits.slice(1)}`;
  return digits;
}

export function whatsappLink(number: string, message?: string): string {
  const digits = normalizeWhatsAppNumber(number);
  if (!digits) return "https://wa.me/";
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
