import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import { formulas } from "@/data/formulas";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return formulas.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: Params) {
  const f = formulas.find((x) => x.slug === params.slug);
  return { title: f ? `${f.title} — Гидродинамика` : "Формула" };
}

export default function FormulaPage({ params }: Params) {
  const f = formulas.find((x) => x.slug === params.slug);
  if (!f) notFound();

  return (
    <article className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/formulas", label: "Формулы" },
          { label: f.title }
        ]}
      />

      <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
        {f.category}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-brand-900">{f.title}</h1>
      <p className="mt-3 text-slate-600">{f.short}</p>

      <div className="formula-block mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-xl">
        <Formula latex={f.latex} display />
      </div>

      {f.about ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Описание</h2>
          <p className="mt-2 text-slate-600">{f.about}</p>
        </section>
      ) : null}

      {f.variables?.length ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Обозначения</h2>
          <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {f.variables.map((v) => (
              <li
                key={v.symbol}
                className="flex items-center gap-4 px-4 py-3"
              >
                <span className="min-w-[3rem] text-center text-lg">
                  <Formula latex={v.symbol} />
                </span>
                <span className="text-sm text-slate-700">{v.meaning}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
