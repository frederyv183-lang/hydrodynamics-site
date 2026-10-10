import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import Chart from "@/components/ui/Chart";
import TemperatureProfileChart from "@/components/charts/TemperatureProfileChart";
import PlanckChart from "@/components/charts/PlanckChart";
import ExtinctionChart from "@/components/charts/ExtinctionChart";
import RadiationBalanceChart from "@/components/charts/RadiationBalanceChart";
import GeostrophicWindChart from "@/components/charts/GeostrophicWindChart";
import BoundaryLayerChart from "@/components/charts/BoundaryLayerChart";
import { getSection, sections } from "@/data/atmosphere";

type Params = { params: { section: string } };

export function generateStaticParams() {
  return sections.map((s) => ({ section: s.slug }));
}

export function generateMetadata({ params }: Params) {
  const s = getSection(params.section);
  return { title: s ? `${s.title} — Физика атмосферы` : "Физика атмосферы" };
}

function getChart(slug: string) {
  if (slug === "structure") {
    return (
      <Chart
        title="Профиль температуры по высоте (стандартная атмосфера)"
        description="Слои: тропосфера (0–11 км), стратосфера (11–50 км), мезосфера (50–90 км), термосфера (90+ км)."
      >
        <TemperatureProfileChart />
      </Chart>
    );
  }
  if (slug === "solar-radiation") {
    return (
      <Chart
        title="Спектр излучения чёрного тела при разных температурах"
        description="Закон Планка. С ростом температуры максимум смещается в коротковолновую область (закон Вина)."
      >
        <PlanckChart />
      </Chart>
    );
  }
  if (slug === "extinction") {
    return (
      <Chart
        title="Ослабление солнечной радиации по закону Буге"
        description="Относительный поток F/F₀ = p^m в зависимости от высоты Солнца для трёх коэффициентов прозрачности p."
      >
        <ExtinctionChart />
      </Chart>
    );
  }
  if (slug === "radiation-balance") {
    return (
      <Chart
        title="Радиационный баланс по широтным зонам"
        description="Годовые значения. Система Земля-атмосфера отрицательна на всех широтах, поверхность положительна в низких широтах и отрицательна в высоких."
      >
        <RadiationBalanceChart />
      </Chart>
    );
  }
  if (slug === "dynamics") {
    return (
      <Chart
        title="Зависимость скорости геострофического ветра от широты"
        description="При фиксированном градиенте давления (1 гПа/100 км) и плотности воздуха (1.3 кг/м³). На экваторе (f = 0) геострофический баланс невозможен."
      >
        <GeostrophicWindChart />
      </Chart>
    );
  }
  if (slug === "boundary-layer") {
    return (
      <Chart
        title="Логарифмический профиль ветра для разных поверхностей"
        description="u* = 0.3 м/с, κ = 0.4. Ось Y — высота в логарифмическом масштабе (0.1–100 м). Трава: z0 = 0.03 м, лес: z0 = 1 м, город: z0 = 2 м."
      >
        <BoundaryLayerChart />
      </Chart>
    );
  }
  return null;
}

export default function AtmosphereSectionPage({ params }: Params) {
  const s = getSection(params.section);
  if (!s) notFound();

  const prev = sections.find((x) => x.order === s.order - 1);
  const next = sections.find((x) => x.order === s.order + 1);
  const chart = getChart(s.slug);

  return (
    <article className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/atmosphere", label: "Физика атмосферы" },
          { label: s.title }
        ]}
      />

      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
        <span>{s.matveevChapter}</span>
        <span className="text-brand-300">·</span>
        <span>Раздел {s.order} из {sections.length}</span>
      </div>

      <h1 className="text-3xl font-bold text-brand-900">{s.title}</h1>
      <p className="mt-3 text-slate-600">{s.description}</p>

      {s.concepts.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900">
            Основные понятия
          </h2>
          <dl className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {s.concepts.map((c) => (
              <div key={c.term} className="px-5 py-4">
                <dt className="font-semibold text-slate-900">{c.term}</dt>
                <dd className="mt-1 text-sm text-slate-700">{c.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {s.formulas.length > 0 ? (
        <section className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Формулы раздела
          </h2>
          {s.formulas.map((f) => (
            <div
              key={f.slug}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{f.short}</p>

              <div className="formula-block mt-4 overflow-x-auto rounded-lg bg-slate-50 px-6 py-6 text-center text-xl">
                <Formula latex={f.latex} display />
              </div>

              {f.about ? (
                <p className="mt-4 text-sm text-slate-700">{f.about}</p>
              ) : null}

              {f.variables?.length ? (
                <div className="mt-4">
                  <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Обозначения
                  </div>
                  <ul className="mt-2 divide-y divide-slate-100">
                    {f.variables.map((v) => (
                      <li
                        key={v.symbol}
                        className="flex items-center gap-3 py-2"
                      >
                        <span className="min-w-[3rem] text-center">
                          <Formula latex={v.symbol} />
                        </span>
                        <span className="text-sm text-slate-700">
                          {v.meaning}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </section>
      ) : (
        <section className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="text-slate-600">
            Раздел в работе. Формулы и понятия появятся позже.
          </p>
        </section>
      )}

      {chart ? (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900">
            Визуализация
          </h2>
          <div className="mt-4">{chart}</div>
        </section>
      ) : null}

      <nav className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 text-sm">
        {prev ? (
          <Link
            href={`/atmosphere/${prev.slug}`}
            className="text-brand-700 hover:text-brand-800"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/atmosphere/${next.slug}`}
            className="text-brand-700 hover:text-brand-800"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
