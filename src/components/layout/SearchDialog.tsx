"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { search } from "@/data/searchIndex";

const KIND_LABEL: Record<string, string> = {
  section: "\u0420\u0430\u0437\u0434\u0435\u043b",
  concept: "\u041f\u043e\u043d\u044f\u0442\u0438\u0435",
  formula: "\u0424\u043e\u0440\u043c\u0443\u043b\u0430",
  "reference-formula": "\u0424\u043e\u0440\u043c\u0443\u043b\u0430",
  model: "\u041c\u043e\u0434\u0435\u043b\u044c",
  calculator: "\u041a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440",
  method: "\u041c\u0435\u0442\u043e\u0434"
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = query.trim() ? search(query, 40) : [];

  // Группировка для отображения: сохраняем порядок появления
  const groups: { group: string; items: typeof results }[] = [];
  const groupIndex = new Map<string, number>();
  for (const r of results) {
    if (!groupIndex.has(r.group)) {
      groupIndex.set(r.group, groups.length);
      groups.push({ group: r.group, items: [] });
    }
    groups[groupIndex.get(r.group)!].items.push(r);
  }

  const go = useCallback(
    (href: string, anchor?: string) => {
      setOpen(false);
      setQuery("");
      router.push(anchor ? `${href}#${anchor}` : href);
    },
    [router]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 px-4 pt-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="Глобальный поиск"
          shouldFilter={false}
          className="flex flex-col"
        >
          <div className="border-b border-slate-200 px-4 py-3">
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Поиск: раздел, формула, понятие, калькулятор..."
              className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            {query.trim() === "" ? (
              <div className="px-3 py-8 text-center text-sm text-slate-400">
                Начните вводить название или транслит
                <div className="mt-1 text-xs">
                  Например: «вве», «vved», «кориолис», «точка росы», «hadley»
                </div>
              </div>
            ) : results.length === 0 ? (
              <Command.Empty className="px-3 py-8 text-center text-sm text-slate-400">
                Ничего не найдено
              </Command.Empty>
            ) : (
              groups.map((g) => (
                <Command.Group
                  key={g.group}
                  heading={g.group}
                  className="mb-2"
                >
                  <div className="px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    {g.group}
                  </div>
                  {g.items.map((r) => (
                    <Command.Item
                      key={r.id}
                      value={r.id}
                      onSelect={() => go(r.href, r.anchor)}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-slate-800 data-[selected=true]:bg-brand-50 data-[selected=true]:text-brand-900"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-medium">{r.title}</span>
                        <span className="truncate text-xs text-slate-500">
                          {r.href}
                          {r.anchor ? `#${r.anchor}` : ""}
                        </span>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                        {KIND_LABEL[r.kind] ?? r.kind}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              ))
            )}
          </Command.List>

          <div className="border-t border-slate-200 px-4 py-2 text-xs text-slate-500">
            ↑↓ — навигация · Enter — перейти · Esc — закрыть · ⌘K / Ctrl+K — открыть
          </div>
        </Command>
      </div>
    </div>
  );
}

export function SearchButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      // Программно открыть панель — эмулируем Ctrl+K
      const ev = new KeyboardEvent("keydown", {
        key: "k",
        ctrlKey: true,
        bubbles: true
      });
      window.dispatchEvent(ev);
      setOpen(false);
    }
  }, [open]);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 transition hover:border-brand-300 hover:text-brand-700"
      aria-label="Открыть поиск"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="hidden sm:inline">Поиск</span>
      <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}