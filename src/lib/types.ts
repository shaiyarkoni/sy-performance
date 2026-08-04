export type Stat = {
  id: string;
  value: string;
  label: string;
};

export type AudienceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type Program = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  image: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
};

export type Testimonial = {
  id: string;
  name: string;
  sport: string;
  quote: string;
  rating: number;
  image: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Plain text. A blank line starts a new paragraph, a line ending with ":" renders as a subheading. */
  body: string;
  readTime: string;
  date: string;
  image: string;
};

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "youtube"
  | "linkedin";

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
    stats: Stat[];
  };
  about: {
    eyebrow: string;
    heading: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    highlights: string[];
  };
  audience: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: AudienceItem[];
  };
  programs: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Program[];
  };
  certificates: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Certificate[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Testimonial[];
  };
  articles: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Article[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    /** International format without "+" or spaces, e.g. 972501234567. Used to build wa.me links. */
    whatsappNumber: string;
    phoneDisplay: string;
    email: string;
    location: string;
    socials: Record<SocialPlatform, string>;
  };
};
