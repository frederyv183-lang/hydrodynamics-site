import Link from "next/link";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Chart from "@/components/ui/Chart";
import DragVsSpeedChart from "@/components/charts/DragVsSpeedChart";
import ReRegimeChart from "@/components/charts/ReRegimeChart";
import { formulas } from "@/data/formulas";
import { models } from "@/data/models";
import { atmosphereEntries } from "@/data/atmosphere";

const sections = [
  {
    href: "/formulas",
    title: "Формулы",
    description: "Справочник по формулам гидродинамики с пояснениями.",
    badge: "Справочник"
  },
  {
    href: "/models",
    title: "Модели",
    description: "Описание математических моделей: от мелкой воды до турбулентности.",
    badge: "Теория"
  },
  {
    href: "/calculators",
    title: "Калькуляторы",
    description: "Интерактивные расчёты: число Рейнольдса, расход, потери напора.",
    badge: "Инструменты"
  },
  {
    href: "/atmosphere",
    title: "Атмосфера и океан",
    description: "Числа Ричардсона, Россби, Фруда, геострофический ветер, внутренние волны.",
    badge: "Геофизика"
  }
];

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-brand-900 sm:text-5xl">
          Гидродинамика
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Справочник формул, описание моделей и калькуляторы для расчётов.
        </p>
      </section>

      <Section title="Разделы">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s) => (
            <Card
              key={s.href}
              href={s.href}
              title={s.title}
              description={s.description}
              badge={s.badge}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Визуализация"
        action={
          <Link
            href="/calculators"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Все калькуляторы →
          </Link>
        }
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Chart
            title="Режимы течения по числу Рейнольдса"
            description="Ламинарный (Re < 2300), переходный (2300–4000), турбулентный (Re > 4000)."
          >
            <ReRegimeChart />
          </Chart>
          <Chart
            title="Сила сопротивления vs скорость"
            description="F_d = ½·C_d·ρ·v²·A для трёх форм (A = 0.01 м², ρ = 1000 кг/м³)."
          >
            <DragVsSpeedChart />
          </Chart>
        </div>
      </Section>

      <Section
        title="Популярные формулы"
        action={
          <Link
            href="/formulas"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Все формулы →
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {formulas.slice(0, 3).map((f) => (
            <Card
              key={f.slug}
              href={`/formulas/${f.slug}`}
              title={f.title}
              description={f.short}
              badge={f.category}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Модели"
        action={
          <Link
            href="/models"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Все модели →
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.slice(0, 3).map((m) => (
            <Card
              key={m.slug}
              href={`/models/${m.slug}`}
              title={m.title}
              description={m.short}
              badge={m.category}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Атмосфера и океан"
        action={
          <Link
            href="/atmosphere"
            className="text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Все материалы →
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {atmosphereEntries.slice(0, 3).map((e) => (
            <Card
              key={e.slug}
              href={`/atmosphere/${e.slug}`}
              title={e.title}
              description={e.short}
              badge={e.category}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
