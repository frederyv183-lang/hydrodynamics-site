import Link from "next/link";
import Formula from "@/components/ui/Formula";
import { formulas } from "@/data/formulas";

export const metadata = {
  title: "Формулы — Гидродинамика"
};

export default function FormulasPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Формулы</h1>
      <p className="mt-2 text-slate-600">
        Справочник основных формул гидродинамики.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {formulas.map((f) => (
          <Link
            key={f.slug}
            href={`/formulas/${f.slug}`}
            className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-300 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
              {f.category}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">
              {f.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">{f.short}</p>
            <div className="formula-block mt-4 overflow-x-auto rounded-lg bg-slate-50 px-4 py-3 text-center">
              <Formula latex={f.latex} display />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
