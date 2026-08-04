"use client";

import { Plus, X } from "lucide-react";
import type { ReactNode } from "react";
import { ImageUpload } from "./image-upload";

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="text-lg font-black">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-fog">{description}</p>
      ) : null}
      <div className="mt-5 grid gap-4">{children}</div>
    </section>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  dir,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="field"
        dir={dir}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <span className="text-xs text-fog">{hint}</span> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 5,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        className="field resize-y leading-relaxed"
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <span className="text-xs text-fog">{hint}</span> : null}
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <ImageUpload value={value} onChange={onChange} />
    </div>
  );
}

export function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-volt" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-ink transition-all ${
            checked ? "start-6" : "start-1"
          }`}
        />
      </button>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

/** Editor for a plain list of strings, such as program features or highlights. */
export function StringListField({
  label,
  values,
  onChange,
  addLabel,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  addLabel: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>

      <div className="grid gap-2">
        {values.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="field"
              value={entry}
              placeholder={placeholder}
              onChange={(event) => {
                const next = [...values];
                next[index] = event.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              aria-label="מחיקת שורה"
              onClick={() => onChange(values.filter((_, i) => i !== index))}
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-fog transition-colors hover:border-red-500/60 hover:text-red-400"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-bold transition-colors hover:border-volt hover:text-volt"
      >
        <Plus className="size-3.5" />
        {addLabel}
      </button>
    </div>
  );
}
