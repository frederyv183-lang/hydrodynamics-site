"use client";

import { useMemo, useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import { symbols } from "@/data/symbols";

export default function SymbolsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return symbols;
    return symbols.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [query]);

  const byCategory = useMemo(() => {
    const map = new Map<string, typeof symbols>();
    for (const s of filtered) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Сокращения" }
        ]}
      />

      <header className="mb-8 mt-4">
        <h1 className="text-4xl font-bold mb-3">Сокращения и обозначения</h1>
        <p className="text-lg text-muted-foreground">
          Список математических символов и физических величин, используемых в формулах и моделях.
          Всего: {symbols.length}.
        </p>
      </header>

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по символу или значению..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-base outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {byCategory.length === 0 && (
        <p className="text-slate-500">Ничего не найдено.</p>
      )}

      {byCategory.map(([category, items]) => (
        <section key={category} className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-brand-700 border-b border-slate-200 pb-2">
            {category}
          </h2>
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {items.map((s, i) => (
              <li key={i} className="flex items-center gap-4 px-4 py-3">
                <span className="min-w-[3rem] shrink-0 text-center text-lg">
                  <Formula latex={s.symbol} />
                </span>
                <span className="text-sm text-slate-700">{s.meaning}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}