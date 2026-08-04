"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

type Identifiable = { id: string };

type ListEditorProps<T extends Identifiable> = {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  itemTitle: (item: T, index: number) => string;
  addLabel: string;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
};

export function ListEditor<T extends Identifiable>({
  items,
  onChange,
  createItem,
  itemTitle,
  addLabel,
  renderItem,
}: ListEditorProps<T>) {
  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <details
          key={item.id}
          className="group rounded-xl border border-line bg-ink-soft open:border-volt/40"
        >
          <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
            <ChevronDown className="size-4 shrink-0 text-fog transition-transform group-open:rotate-180" />
            <span className="flex-1 truncate text-sm font-bold">
              {itemTitle(item, index) || "פריט חדש"}
            </span>

            <span className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label="הזז למעלה"
                disabled={index === 0}
                onClick={(event) => {
                  event.preventDefault();
                  move(index, -1);
                }}
                className="grid size-8 place-items-center rounded-lg border border-line text-fog transition-colors hover:border-volt hover:text-volt disabled:opacity-30 disabled:hover:border-line disabled:hover:text-fog"
              >
                <ChevronUp className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="הזז למטה"
                disabled={index === items.length - 1}
                onClick={(event) => {
                  event.preventDefault();
                  move(index, 1);
                }}
                className="grid size-8 place-items-center rounded-lg border border-line text-fog transition-colors hover:border-volt hover:text-volt disabled:opacity-30 disabled:hover:border-line disabled:hover:text-fog"
              >
                <ChevronDown className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="מחיקה"
                onClick={(event) => {
                  event.preventDefault();
                  onChange(items.filter((entry) => entry.id !== item.id));
                }}
                className="grid size-8 place-items-center rounded-lg border border-line text-fog transition-colors hover:border-red-500/60 hover:text-red-400"
              >
                <Trash2 className="size-3.5" />
              </button>
            </span>
          </summary>

          <div className="grid gap-4 border-t border-line p-4">
            {renderItem(item, (patch) =>
              onChange(
                items.map((entry) =>
                  entry.id === item.id ? { ...entry, ...patch } : entry,
                ),
              ),
            )}
          </div>
        </details>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items, createItem()])}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-line px-4 py-2.5 text-sm font-bold transition-colors hover:border-volt hover:text-volt"
      >
        <Plus className="size-4" />
        {addLabel}
      </button>
    </div>
  );
}

export function newId() {
  return globalThis.crypto.randomUUID().slice(0, 8);
}
