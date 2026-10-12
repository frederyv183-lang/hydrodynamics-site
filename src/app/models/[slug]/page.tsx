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

      {m.numerics && (m.numerics.grid || m.numerics.advection || m.numerics.timeStepping || m.numerics.solver) ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Численный метод</h2>
          <dl className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {m.numerics.grid ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Сетка</dt><dd className="text-sm text-slate-700">{m.numerics.grid}</dd></div>) : null}
            {m.numerics.advection ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Адвекция</dt><dd className="text-sm text-slate-700">{m.numerics.advection}</dd></div>) : null}
            {m.numerics.timeStepping ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Шаг по времени</dt><dd className="text-sm text-slate-700">{m.numerics.timeStepping}</dd></div>) : null}
            {m.numerics.solver ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Решатель</dt><dd className="text-sm text-slate-700">{m.numerics.solver}</dd></div>) : null}
          </dl>
        </section>
      ) : null}

      {m.parameterizations && (m.parameterizations.convection || m.parameterizations.turbulence || m.parameterizations.microphysics || m.parameterizations.radiation || m.parameterizations.landSurface) ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Параметризации подсеточных процессов</h2>
          <dl className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {m.parameterizations.convection ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Конвекция</dt><dd className="text-sm text-slate-700">{m.parameterizations.convection}</dd></div>) : null}
            {m.parameterizations.turbulence ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Турбулентность</dt><dd className="text-sm text-slate-700">{m.parameterizations.turbulence}</dd></div>) : null}
            {m.parameterizations.microphysics ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Микрофизика</dt><dd className="text-sm text-slate-700">{m.parameterizations.microphysics}</dd></div>) : null}
            {m.parameterizations.radiation ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Радиация</dt><dd className="text-sm text-slate-700">{m.parameterizations.radiation}</dd></div>) : null}
            {m.parameterizations.landSurface ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Подстилающая поверхность</dt><dd className="text-sm text-slate-700">{m.parameterizations.landSurface}</dd></div>) : null}
          </dl>
        </section>
      ) : null}

      {m.convergence && (m.convergence.order || m.convergence.stability || m.convergence.error) ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Разрешение и горизонт</h2>
          <dl className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {m.convergence.order ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Разрешение</dt><dd className="text-sm text-slate-700">{m.convergence.order}</dd></div>) : null}
            {m.convergence.stability ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Горизонт</dt><dd className="text-sm text-slate-700">{m.convergence.stability}</dd></div>) : null}
            {m.convergence.error ? (<div className="flex gap-4 px-4 py-3"><dt className="w-40 shrink-0 text-sm font-medium text-slate-500">Цикл обновления</dt><dd className="text-sm text-slate-700">{m.convergence.error}</dd></div>) : null}
          </dl>
        </section>
      ) : null}

      {m.algorithm?.length ? (<section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Алгоритм</h2><ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">{m.algorithm.map((a, i) => (<li key={i}>{a}</li>))}</ul></section>) : null}
      {m.assumptions?.length ? (<section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Допущения</h2><ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">{m.assumptions.map((a, i) => (<li key={i}>{a}</li>))}</ul></section>) : null}

      {m.applications?.length ? (<section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Применение</h2><ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">{m.applications.map((a, i) => (<li key={i}>{a}</li>))}</ul></section>) : null}
      {m.source ? (<section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Источник</h2><p className="mt-2 text-sm text-slate-600">{m.source}</p></section>) : null}
    </article>
  );
}
