import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { TmaxForecastCalculator } from "@/components/calculators/TmaxForecastCalculator";
import { tmaxForecastCalculator } from "@/data/calculators/tmax-forecast";

export default function Page() {
  return (
    <CalculatorLayout
      title={tmaxForecastCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: tmaxForecastCalculator.title },
      ]}
      formula={tmaxForecastCalculator.formula}
    >
      <TmaxForecastCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Метод Богаткина</strong> — простой способ прогноза
            максимальной дневной температуры по данным радиозондирования на
            уровне 700 гПа.
          </li>
          <li>
            <strong>T₇₀₀</strong> — температура на изобарической поверхности
            700 гПа (примерно 3000 м над уровнем моря). Определяется по
            аэрологической диаграмме.
          </li>
          <li>
            Коэффициент +23 отражает средний прогрев за счёт солнечной радиации
            в умеренных широтах летом.
          </li>
          <li>
            Метод работает лучше всего при слабом ветре и отсутствии
            фронтальных разделов.
          </li>
          <li>
            Ограничение: не учитывает облачность, осадки, адвекцию.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
