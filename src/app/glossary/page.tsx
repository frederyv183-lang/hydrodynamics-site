"use client";

import { useMemo, useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { glossary } from "@/data/glossary";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }, [query]);

  const byLetter = useMemo(() => {
    const map = new Map<string, typeof glossary>();
    for (const e of filtered) {
      const first = e.term.charAt(0).toUpperCase();
      if (!map.has(first)) map.set(first, []);
      map.get(first)!.push(e);
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.term.localeCompare(b.term, "ru"));
    }
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0], "ru")
    );
  }, [filtered]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Глоссарий" }
        ]}
      />

      <header className="mb-8 mt-4">
        <h1 className="text-4xl font-bold mb-3">Глоссарий</h1>
        <p className="text-lg text-muted-foreground">
          Свод определений по численным методам, динамике атмосферы и гидродинамике.
          Всего терминов: {glossary.length}.
        </p>
      </header>

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по термину, определению или категории..."
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-base outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {byLetter.length === 0 && (
        <p className="text-slate-500">Ничего не найдено.</p>
      )}

      {byLetter.map(([letter, items]) => (
        <section key={letter} className="mb-8">
          <h2 className="mb-3 text-2xl font-bold text-brand-700 border-b border-slate-200 pb-2">
            {letter}
          </h2>
          <div className="space-y-4">
            {items.map((e) => (
              <article
                key={e.slug}
                id={e.slug}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {e.term}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {e.category}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {e.definition}
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}