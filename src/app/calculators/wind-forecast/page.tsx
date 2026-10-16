import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { WindForecastCalculator } from "@/components/calculators/WindForecastCalculator";
import { windForecastCalculator } from "@/data/calculators/wind-forecast";

export default function Page() {
  return (
    <CalculatorLayout
      title={windForecastCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: windForecastCalculator.title },
      ]}
      formula={windForecastCalculator.formula}
    >
      <WindForecastCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Барическая тенденция Δp</strong> — изменение атмосферного
            давления за 3 часа (стандартный срок наблюдений).
          </li>
          <li>
            <strong>Рост давления</strong> (Δp &gt; 0) связан с усилением
            ветра при прохождении фронта или углублении циклона.
          </li>
          <li>
            <strong>Коэффициент k</strong> зависит от региона, сезона и
            синоптической ситуации. Типичные значения: 2–8 (м/с)/гПа.
          </li>
          <li>
            Метод — оценочный, для точного прогноза используются
            гидродинамические модели.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
