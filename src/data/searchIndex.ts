import { sections } from "./atmosphere";
import { formulas as referenceFormulas } from "./formulas";
import { models } from "./models";
import { calculators } from "./calculatorsList";
import { methods } from "./methods";
import { translit } from "@/lib/translit";
import { slugify } from "@/lib/slugify";

export type SearchKind =
  | "section"
  | "concept"
  | "formula"
  | "reference-formula"
  | "model"
  | "calculator"
  | "method";

export type SearchEntry = {
  id: string;
  title: string;
  kind: SearchKind;
  group: string;
  href: string;
  anchor?: string;
  haystack: string;
};

function makeHaystack(parts: (string | undefined)[]): string {
  const joined = parts.filter(Boolean).join(" | ").toLowerCase();
  const trans = translit(joined);
  return `${joined} | ${trans}`;
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const s of sections) {
    entries.push({
      id: `section:${s.slug}`,
      title: s.title,
      kind: "section",
      group: "Физика атмосферы",
      href: `/atmosphere/${s.slug}`,
      haystack: makeHaystack([s.title, s.short, s.matveevChapter])
    });

    for (const c of s.concepts) {
      entries.push({
        id: `concept:${s.slug}:${c.term}`,
        title: c.term,
        kind: "concept",
        group: `Физика атмосферы — ${s.title}`,
        href: `/atmosphere/${s.slug}`,
        anchor: slugify(c.term),
        haystack: makeHaystack([c.term, c.definition, s.title])
      });
    }

    for (const f of s.formulas) {
      entries.push({
        id: `formula:${s.slug}:${f.slug}`,
        title: f.title,
        kind: "formula",
        group: `Физика атмосферы — ${s.title}`,
        href: `/atmosphere/${s.slug}`,
        anchor: f.slug,
        haystack: makeHaystack([f.title, f.short, f.about, s.title])
      });
    }
  }

  for (const f of referenceFormulas) {
    entries.push({
      id: `reference-formula:${f.slug}`,
      title: f.title,
      kind: "reference-formula",
      group: "Формулы",
      href: `/formulas/${f.slug}`,
      haystack: makeHaystack([f.title, f.short, f.about, f.category])
    });
  }

  for (const m of models) {
    entries.push({
      id: `model:${m.slug}`,
      title: m.title,
      kind: "model",
      group: "Модели",
      href: `/models/${m.slug}`,
      haystack: makeHaystack([m.title, m.short, m.about, m.category])
    });
  }

  for (const c of calculators) {
    entries.push({
      id: `calculator:${c.slug}`,
      title: c.title,
      kind: "calculator",
      group: "Калькуляторы",
      href: `/calculators/${c.slug}`,
      haystack: makeHaystack([c.title, c.description, c.badge])
    });
  }

  for (const m of methods) {
    entries.push({
      id: `method:${m.slug}`,
      title: m.title,
      kind: "method",
      group: "\u0427\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u0435 \u043c\u0435\u0442\u043e\u0434\u044b",
      href: `/methods/${m.slug}`,
      haystack: makeHaystack([m.title, m.short, m.about, m.category])
    });
  }

  return entries;
}

export const searchIndex: SearchEntry[] = buildSearchIndex();

export type SearchResult = SearchEntry & { score: number };

export function search(query: string, limit = 30): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const qTrans = translit(q);

  const scored: SearchResult[] = [];
  for (const e of searchIndex) {
    const title = e.title.toLowerCase();
    const titleTrans = translit(title);

    let score = 0;
    if (title.startsWith(q) || titleTrans.startsWith(qTrans)) score = 100;
    else if (title.includes(q) || titleTrans.includes(qTrans)) score = 60;
    else if (e.haystack.includes(q) || e.haystack.includes(qTrans)) score = 30;
    else continue;

    // Плюс за более короткое название (точнее совпадение)
    score += Math.max(0, 20 - title.length);

    scored.push({ ...e, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}