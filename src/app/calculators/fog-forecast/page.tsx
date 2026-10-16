import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { FogForecastCalculator } from "@/components/calculators/FogForecastCalculator";
import { fogForecastCalculator } from "@/data/calculators/fog-forecast";

export default function Page() {
  return (
    <CalculatorLayout
      title={fogForecastCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: fogForecastCalculator.title },
      ]}
      formula={fogForecastCalculator.formula}
    >
      <FogForecastCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Туман</strong> — скопление мелких капель воды в воздухе,
            при котором горизонтальная видимость падает до 1 км и менее.
          </li>
          <li>
            <strong>Метод Петренко</strong>: T_r = T_d − ΔT_d. ΔT_d —
            дефицит точки росы, обычно 2…5 °C для радиационных туманов.
          </li>
          <li>
            <strong>Радиационный туман</strong> образуется ночью при ясном
            небе и слабом ветре, когда земля интенсивно выхолаживается.
          </li>
          <li>
            <strong>Адвективный туман</strong> образуется при движении
            тёплого влажного воздуха над холодной поверхностью.
          </li>
          <li>
            Для прогноза также учитывают: скорость ветра, облачность,
            температуру подстилающей поверхности, влажность.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
