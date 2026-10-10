import Link from "next/link";
import { sections } from "@/data/atmosphere";

export const metadata = {
  title: "Физика атмосферы — Гидродинамика"
};

export default function AtmospherePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Физика атмосферы</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Курс по учебнику Л. Т. Матвеева «Основы общей метеорологии. Физика
        атмосферы» (1965). Разделы идут в порядке глав книги.
      </p>

      <div className="mt-10 space-y-4">
        {sections.map((section) => {
          const isReady = section.formulas.length > 0;
          return (
            <Link
              key={section.slug}
              href={`/atmosphere/${section.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-brand-300">
                    {section.order}.
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {section.matveevChapter} · {section.short}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs">
                  {isReady ? (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
                      {section.formulas.length} формул
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 font-medium text-amber-700">
                      в работе
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
