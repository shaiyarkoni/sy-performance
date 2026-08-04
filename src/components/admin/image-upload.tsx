"use client";

import { useRef, useState, type DragEvent } from "react";
import { ImageUp, Loader2, Trash2 } from "lucide-react";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "ההעלאה נכשלה");
      }

      onChange(data.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "ההעלאה נכשלה",
      );
    } finally {
      setBusy(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) void upload(file);
  }

  return (
    <div className="grid gap-2">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-xl border border-dashed transition-colors ${
          dragging ? "border-volt bg-volt/5" : "border-line bg-ink-soft"
        }`}
      >
        {value ? (
          <img
            src={value}
            alt=""
            className="aspect-16/10 w-full object-cover"
          />
        ) : (
          <div className="grid aspect-16/10 place-items-center text-fog">
            <ImageUp className="size-7" />
          </div>
        )}

        {busy ? (
          <div className="absolute inset-0 grid place-items-center bg-ink/75">
            <Loader2 className="size-6 animate-spin text-volt" />
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-bold text-chalk transition-colors hover:border-volt hover:text-volt disabled:opacity-50"
        >
          <ImageUp className="size-3.5" />
          {value ? "החלף תמונה" : "העלה תמונה"}
        </button>

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-bold text-fog transition-colors hover:border-red-500/60 hover:text-red-400"
          >
            <Trash2 className="size-3.5" />
            הסר
          </button>
        ) : null}

        <span className="text-xs text-fog">גרירה לתיבה גם עובדת</span>
      </div>

      {error ? <p className="text-xs text-red-400">{error}</p> : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}
