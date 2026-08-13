"use client";

import {
  ImageField,
  Panel,
  Row,
  StringListField,
  TextAreaField,
  TextField,
  ToggleField,
} from "./fields";
import { ListEditor, newId } from "./list-editor";
import { socialMeta } from "@/components/site/social-icons";
import type { SiteContent, SocialPlatform } from "@/lib/types";

type PanelProps<K extends keyof SiteContent> = {
  value: SiteContent[K];
  onChange: (value: SiteContent[K]) => void;
};

function useSetter<T>(value: T, onChange: (value: T) => void) {
  return (patch: Partial<T>) => onChange({ ...value, ...patch });
}

export function BrandPanel({ value, onChange }: PanelProps<"brand">) {
  const set = useSetter(value, onChange);

  return (
    <Panel
      title="פרטי המותג"
      description="השם שמופיע בפוטר ובכותרת הדפדפן."
    >
      <Row>
        <TextField
          label="שם העסק"
          value={value.name}
          onChange={(name) => set({ name })}
        />
        <TextField
          label="משפט תיאור קצר"
          value={value.tagline}
          onChange={(tagline) => set({ tagline })}
        />
      </Row>
    </Panel>
  );
}

export function HeroPanel({ value, onChange }: PanelProps<"hero">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel
        title="מסך הפתיחה"
        description="הדבר הראשון שכל מבקר רואה כשהוא נכנס לאתר."
      >
        <TextField
          label="שורה עליונה קטנה"
          value={value.kicker}
          onChange={(kicker) => set({ kicker })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.title}
          onChange={(title) => set({ title })}
        />
        <TextAreaField
          label="פסקת פתיחה"
          value={value.subtitle}
          onChange={(subtitle) => set({ subtitle })}
          rows={4}
        />
        <Row>
          <TextField
            label="כפתור ראשי"
            value={value.primaryCta}
            onChange={(primaryCta) => set({ primaryCta })}
          />
          <TextField
            label="כפתור משני"
            value={value.secondaryCta}
            onChange={(secondaryCta) => set({ secondaryCta })}
          />
        </Row>
        <ImageField
          label="תמונת רקע"
          value={value.image}
          onChange={(image) => set({ image })}
        />
      </Panel>

      <Panel
        title="מספרים בפתיחה"
        description="ארבעה נתונים שמופיעים בפס התחתון של מסך הפתיחה. מספרים מתחילים לרוץ באנימציה."
      >
        <ListEditor
          items={value.stats}
          onChange={(stats) => set({ stats })}
          createItem={() => ({ id: newId(), value: "", label: "" })}
          itemTitle={(stat) => `${stat.value} ${stat.label}`.trim()}
          addLabel="הוסף נתון"
          renderItem={(stat, update) => (
            <Row>
              <TextField
                label="מספר"
                value={stat.value}
                onChange={(next) => update({ value: next })}
                hint="ספרות בלבד ירוצו באנימציה, למשל 250"
              />
              <TextField
                label="תיאור"
                value={stat.label}
                onChange={(label) => update({ label })}
              />
            </Row>
          )}
        />
      </Panel>
    </>
  );
}

export function AboutPanel({ value, onChange }: PanelProps<"about">) {
  const set = useSetter(value, onChange);

  return (
    <Panel title="מי אני" description="הסיפור האישי שלך והתמונה שלך.">
      <Row>
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת הסקשן"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
      </Row>
      <Row>
        <TextField
          label="השם שלך"
          value={value.name}
          onChange={(name) => set({ name })}
        />
        <TextField
          label="תפקיד / הסמכה"
          value={value.role}
          onChange={(role) => set({ role })}
        />
      </Row>
      <TextAreaField
        label="הביוגרפיה שלך"
        value={value.bio}
        onChange={(bio) => set({ bio })}
        rows={10}
        hint="שורה ריקה בין פסקאות תיצור פסקה חדשה באתר."
      />
      <ImageField
        label="תמונת פרופיל"
        value={value.image}
        onChange={(image) => set({ image })}
      />
      <StringListField
        label="נקודות בולטות"
        values={value.highlights}
        onChange={(highlights) => set({ highlights })}
        addLabel="הוסף נקודה"
        placeholder="למשל: ליווי אישי לאורך כל העונה"
      />
    </Panel>
  );
}

export function AudiencePanel({ value, onChange }: PanelProps<"audience">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel title="למי זה מתאים" description="כותרות הסקשן.">
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
        <TextAreaField
          label="תיאור"
          value={value.subheading}
          onChange={(subheading) => set({ subheading })}
          rows={3}
        />
      </Panel>

      <Panel title="קהלי היעד" description="כל כרטיס עם תמונה משלו.">
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({
            id: newId(),
            title: "",
            description: "",
            image: "",
          })}
          itemTitle={(item) => item.title}
          addLabel="הוסף קהל יעד"
          renderItem={(item, update) => (
            <>
              <TextField
                label="כותרת"
                value={item.title}
                onChange={(title) => update({ title })}
              />
              <TextAreaField
                label="תיאור"
                value={item.description}
                onChange={(description) => update({ description })}
                rows={4}
              />
              <ImageField
                label="תמונה"
                value={item.image}
                onChange={(image) => update({ image })}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}

export function ProgramsPanel({ value, onChange }: PanelProps<"programs">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel title="מסלולים" description="כותרות הסקשן.">
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
        <TextAreaField
          label="תיאור"
          value={value.subheading}
          onChange={(subheading) => set({ subheading })}
          rows={3}
        />
      </Panel>

      <Panel
        title="חבילות האימון"
        description="סמן מסלול אחד כפופולרי כדי להבליט אותו."
      >
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({
            id: newId(),
            name: "",
            tagline: "",
            description: "",
            price: "",
            period: "לחודש",
            features: [],
            popular: false,
            image: "",
          })}
          itemTitle={(item) => item.name}
          addLabel="הוסף מסלול"
          renderItem={(item, update) => (
            <>
              <Row>
                <TextField
                  label="שם המסלול"
                  value={item.name}
                  onChange={(name) => update({ name })}
                />
                <TextField
                  label="משפט מלווה"
                  value={item.tagline}
                  onChange={(tagline) => update({ tagline })}
                />
              </Row>
              <TextAreaField
                label="תיאור"
                value={item.description}
                onChange={(description) => update({ description })}
                rows={4}
              />
              <Row>
                <TextField
                  label="מחיר"
                  value={item.price}
                  onChange={(price) => update({ price })}
                  hint="למשל ₪750"
                />
                <TextField
                  label="תקופה"
                  value={item.period}
                  onChange={(period) => update({ period })}
                  hint="למשל לחודש"
                />
              </Row>
              <StringListField
                label="מה כלול"
                values={item.features}
                onChange={(features) => update({ features })}
                addLabel="הוסף שורה"
              />
              <ToggleField
                label="סמן כמסלול הפופולרי"
                checked={item.popular}
                onChange={(popular) => update({ popular })}
              />
              <ImageField
                label="תמונה"
                value={item.image}
                onChange={(image) => update({ image })}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}

export function CertificatesPanel({
  value,
  onChange,
}: PanelProps<"certificates">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel title="תעודות" description="כותרות הסקשן.">
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
        <TextAreaField
          label="תיאור"
          value={value.subheading}
          onChange={(subheading) => set({ subheading })}
          rows={3}
        />
      </Panel>

      <Panel
        title="ההסמכות שלי"
        description="העלה צילום או סריקה של כל תעודה. לחיצה באתר מגדילה אותה."
      >
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({
            id: newId(),
            title: "",
            issuer: "",
            year: "",
            image: "",
          })}
          itemTitle={(item) => item.title}
          addLabel="הוסף תעודה"
          renderItem={(item, update) => (
            <>
              <TextField
                label="שם התעודה"
                value={item.title}
                onChange={(title) => update({ title })}
              />
              <Row>
                <TextField
                  label="גוף מסמיך"
                  value={item.issuer}
                  onChange={(issuer) => update({ issuer })}
                />
                <TextField
                  label="שנה"
                  value={item.year}
                  onChange={(year) => update({ year })}
                />
              </Row>
              <ImageField
                label="צילום התעודה"
                value={item.image}
                onChange={(image) => update({ image })}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}

export function TestimonialsPanel({
  value,
  onChange,
}: PanelProps<"testimonials">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel title="ממליצים" description="כותרות הסקשן.">
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
        <TextAreaField
          label="תיאור"
          value={value.subheading}
          onChange={(subheading) => set({ subheading })}
          rows={3}
        />
      </Panel>

      <Panel title="ההמלצות" description="ההמלצות מוצגות בקרוסלה נגללת.">
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({
            id: newId(),
            name: "",
            sport: "",
            quote: "",
            rating: 5,
            image: "",
          })}
          itemTitle={(item) => item.name}
          addLabel="הוסף המלצה"
          renderItem={(item, update) => (
            <>
              <Row>
                <TextField
                  label="שם הממליץ"
                  value={item.name}
                  onChange={(name) => update({ name })}
                />
                <TextField
                  label="ענף ספורט / הקשר"
                  value={item.sport}
                  onChange={(sport) => update({ sport })}
                />
              </Row>
              <TextAreaField
                label="ההמלצה"
                value={item.quote}
                onChange={(quote) => update({ quote })}
                rows={5}
              />
              <label className="grid gap-2">
                <span className="text-sm font-medium">דירוג</span>
                <select
                  className="field"
                  value={item.rating}
                  onChange={(event) =>
                    update({ rating: Number(event.target.value) })
                  }
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} כוכבים
                    </option>
                  ))}
                </select>
              </label>
              <ImageField
                label="תמונת הממליץ"
                value={item.image}
                onChange={(image) => update({ image })}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}

export function ArticlesPanel({ value, onChange }: PanelProps<"articles">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel title="מאמרים" description="כותרות הסקשן.">
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
        <TextAreaField
          label="תיאור"
          value={value.subheading}
          onChange={(subheading) => set({ subheading })}
          rows={3}
        />
        <TextField
          label="שם המחבר (זכויות יוצרים)"
          value={value.authorName ?? ""}
          onChange={(authorName) => set({ authorName })}
        />
        <TextAreaField
          label="הודעת זכויות יוצרים"
          value={value.copyrightNotice ?? ""}
          onChange={(copyrightNotice) => set({ copyrightNotice })}
          rows={3}
          hint="מוצגת בראש ובסוף עמוד המאמר המלא."
        />
      </Panel>

      <Panel
        title="המאמרים שלי"
        description="המאמר הראשון ברשימה מוצג גדול בדף הבית."
      >
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({
            id: newId(),
            slug: "",
            title: "",
            excerpt: "",
            body: "",
            readTime: "5 דקות קריאה",
            date: new Date().toISOString().slice(0, 10),
            image: "",
          })}
          itemTitle={(item) => item.title}
          addLabel="הוסף מאמר"
          renderItem={(item, update) => (
            <>
              <TextField
                label="כותרת המאמר"
                value={item.title}
                onChange={(title) => update({ title })}
              />
              <TextField
                label="כתובת המאמר"
                value={item.slug}
                dir="ltr"
                onChange={(slug) => update({ slug })}
                hint="באנגלית עם מקפים בלבד, למשל strength-training-for-teens"
              />
              <TextAreaField
                label="תקציר"
                value={item.excerpt}
                onChange={(excerpt) => update({ excerpt })}
                rows={4}
              />
              <TextAreaField
                label="גוף המאמר"
                value={item.body}
                onChange={(body) => update({ body })}
                rows={16}
                hint="שורה ריקה בין פסקאות. שורה שמסתיימת בנקודתיים = כותרת ביניים. שורה עם --- בלבד: מה שאחריה לא באתר (לפני הכפתור «מעבר למאמר מלא»). בלי --- מוצגות 22 השורות הראשונות."
              />
              <Row>
                <TextField
                  label="תאריך פרסום"
                  value={item.date}
                  dir="ltr"
                  onChange={(date) => update({ date })}
                  hint="בפורמט YYYY-MM-DD"
                />
                <TextField
                  label="זמן קריאה"
                  value={item.readTime}
                  onChange={(readTime) => update({ readTime })}
                />
              </Row>
              <ImageField
                label="תמונת כותרת"
                value={item.image}
                onChange={(image) => update({ image })}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}

export function FaqPanel({ value, onChange }: PanelProps<"faq">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel title="שאלות ותשובות" description="כותרות הסקשן.">
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
        <TextAreaField
          label="תיאור"
          value={value.subheading}
          onChange={(subheading) => set({ subheading })}
          rows={3}
        />
      </Panel>

      <Panel
        title="שאלות"
        description="לחיצה על שאלה באתר פותחת את התשובה מתחתיה."
      >
        <ListEditor
          items={value.items}
          onChange={(items) => set({ items })}
          createItem={() => ({
            id: newId(),
            question: "",
            answer: "",
          })}
          itemTitle={(item) => item.question}
          addLabel="הוסף שאלה"
          renderItem={(item, update) => (
            <>
              <TextField
                label="שאלה"
                value={item.question}
                onChange={(question) => update({ question })}
              />
              <TextAreaField
                label="תשובה"
                value={item.answer}
                onChange={(answer) => update({ answer })}
                rows={5}
              />
            </>
          )}
        />
      </Panel>
    </>
  );
}

export function ContactPanel({ value, onChange }: PanelProps<"contact">) {
  const set = useSetter(value, onChange);

  return (
    <>
      <Panel title="צור קשר" description="כותרות הסקשן.">
        <TextField
          label="כותרת קטנה"
          value={value.eyebrow}
          onChange={(eyebrow) => set({ eyebrow })}
        />
        <TextField
          label="כותרת ראשית"
          value={value.heading}
          onChange={(heading) => set({ heading })}
        />
        <TextAreaField
          label="תיאור"
          value={value.subheading}
          onChange={(subheading) => set({ subheading })}
          rows={3}
        />
      </Panel>

      <Panel
        title="פרטי התקשרות"
        description="מספר הוואטסאפ הוא היעד של כל הכפתורים ושל הטופס באתר."
      >
        <Row>
          <TextField
            label="מספר וואטסאפ"
            value={value.whatsappNumber}
            dir="ltr"
            onChange={(whatsappNumber) => set({ whatsappNumber })}
            hint="972546890426 — בלי +, בלי 0 בהתחלה (ישראל)"
          />
          <TextField
            label="טלפון לתצוגה"
            value={value.phoneDisplay}
            dir="ltr"
            onChange={(phoneDisplay) => set({ phoneDisplay })}
          />
        </Row>
        <Row>
          <TextField
            label="אימייל"
            value={value.email}
            dir="ltr"
            onChange={(email) => set({ email })}
          />
          <TextField
            label="אזור פעילות"
            value={value.location}
            onChange={(location) => set({ location })}
          />
        </Row>
      </Panel>

      <Panel
        title="רשתות חברתיות"
        description="השאר שדה ריק כדי להסתיר את הרשת מהאתר."
      >
        {(Object.keys(socialMeta) as SocialPlatform[]).map((platform) => (
          <TextField
            key={platform}
            label={socialMeta[platform].label}
            value={value.socials[platform]}
            dir="ltr"
            onChange={(url) =>
              set({ socials: { ...value.socials, [platform]: url } })
            }
            placeholder="https://"
          />
        ))}
      </Panel>
    </>
  );
}
