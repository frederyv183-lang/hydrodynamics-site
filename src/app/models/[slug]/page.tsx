import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import { models } from "@/data/models";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: Params) {
  const m = models.find((x) => x.slug === params.slug);
  return { title: m ? `${m.title} — Гидродинамика` : "Модель" };
}

export default function ModelPage({ params }: Params) {
  const m = models.find((x) => x.slug === params.slug);
  if (!m) notFound();

  return (
    <article className="max-w-3xl">
      <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/models", label: "Модели" }, { label: m.title }]} />
      <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">{m.category}</span>
      <h1 className="mt-3 text-3xl font-bold text-brand-900">{m.title}</h1>
      <p className="mt-3 text-slate-600">{m.short}</p>

      {m.about ? (<section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Описание</h2><p className="mt-2 text-slate-600">{m.about}</p></section>) : null}

      {m.equations?.length ? (
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Уравнения модели</h2>
          {m.equations.map((eq, i) => (
            <div key={i} className="space-y-4">
              <div className="formula-block overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center">
                {eq.caption ? (<div className="mb-3 text-xs uppercase tracking-wide text-slate-500">{eq.caption}</div>) : null}
                <Formula latex={eq.latex} display />
              </div>
              {eq.variables?.length ? (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-slate-900">Обозначения</h3>
                  <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                    {eq.variables.map((v, j) => (
                      <li key={j} className="flex items-center gap-4 px-4 py-3">
                        <span className="min-w-[3rem] text-center text-lg"><Formula latex={v.symbol} /></span>
                        <span className="text-sm text-slate-700">{v.meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {m.assumptions?.length ? (<section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Допущения</h2><ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">{m.assumptions.map((a, i) => (<li key={i}>{a}</li>))}</ul></section>) : null}

      {m.applications?.length ? (<section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Применение</h2><ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">{m.applications.map((a, i) => (<li key={i}>{a}</li>))}</ul></section>) : null}
    </article>
  );
}
