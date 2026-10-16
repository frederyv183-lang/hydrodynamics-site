import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { HeatInfluxCalculator } from "@/components/calculators/HeatInfluxCalculator";
import { heatInfluxCalculator } from "@/data/calculators/heat-influx";

export default function Page() {
  return (
    <CalculatorLayout
      title={heatInfluxCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: heatInfluxCalculator.title },
      ]}
      formula={heatInfluxCalculator.formula}
    >
      <HeatInfluxCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Уравнение притока тепла</strong> — форма первого начала
            термодинамики для влажного воздуха.
          </li>
          <li>
            <strong>Три слагаемых</strong>:
            <ul className="mt-1 list-[circle] pl-5">
              <li>c_p·dT — нагрев/охлаждение (внутренняя энергия)</li>
              <li>−RT·dp/p — работа расширения/сжатия</li>
              <li>L·ds_m — теплота конденсации/испарения</li>
            </ul>
          </li>
          <li>
            При <strong>ds_m &gt; 0</strong> (конденсация) — тепло выделяется,
            T растёт. При <strong>ds_m &lt; 0</strong> (испарение) — тепло
            поглощается, T падает.
          </li>
          <li>
            При <strong>dQ = 0</strong> получаем адиабатический процесс
            Пуассона.
          </li>
          <li>
            Лежит в основе прогностических уравнений температуры и влажности
            в численных моделях погоды.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
