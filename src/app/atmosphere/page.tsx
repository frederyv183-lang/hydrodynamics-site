import Link from "next/link";
import Formula from "@/components/ui/Formula";
import { atmosphereEntries } from "@/data/atmosphere";

export const metadata = {
  title: "Атмосфера и океан — Гидродинамика"
};

export default function AtmospherePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Атмосфера и океан</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Формулы и безразмерные числа, описывающие динамику атмосферы и океана:
        стратификация, вращение Земли, внутренние волны.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {atmosphereEntries.map((e) => (
          <Link
            key={e.slug}
            href={`/atmosphere/${e.slug}`}
            className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
              {e.category}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              {e.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{e.short}</p>
            <div className="formula-block mt-4 overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
              <Formula latex={e.latex} display />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
