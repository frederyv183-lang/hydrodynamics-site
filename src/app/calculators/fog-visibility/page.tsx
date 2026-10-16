import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { FogVisibilityCalculator } from "@/components/calculators/FogVisibilityCalculator";
import { fogVisibilityCalculator } from "@/data/calculators/fog-visibility";

export default function Page() {
  return (
    <CalculatorLayout
      title={fogVisibilityCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: fogVisibilityCalculator.title },
      ]}
      formula={fogVisibilityCalculator.formula}
    >
      <FogVisibilityCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Метеорологическая дальность видимости (МДВ)</strong> —
            максимальное расстояние, на котором можно различить объект.
          </li>
          <li>
            <strong>Формула S_m = 60/√q</strong> — эмпирическая связь между
            видимостью и водностью тумана q (г/м³).
          </li>
          <li>
            <strong>Классификация</strong>:
            <ul className="mt-1 list-[circle] pl-5">
              <li>500…1000 м — умеренный туман</li>
              <li>50…500 м — сильный туман</li>
              <li>&lt; 50 м — очень сильный туман (опасен)</li>
            </ul>
          </li>
          <li>
            <strong>Применение</strong>: авиация (минимумы для взлёта и
            посадки), морская навигация, автомобильный транспорт.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
