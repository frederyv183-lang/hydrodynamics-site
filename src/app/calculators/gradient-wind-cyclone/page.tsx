import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { GradientWindCycloneCalculator } from "@/components/calculators/GradientWindCycloneCalculator";
import { gradientWindCycloneCalculator } from "@/data/calculators/gradient-wind-cyclone";

export default function Page() {
  return (
    <CalculatorLayout
      title={gradientWindCycloneCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: gradientWindCycloneCalculator.title },
      ]}
      formula={gradientWindCycloneCalculator.formula}
    >
      <GradientWindCycloneCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Градиентный ветер</strong> — теоретическая модель ветра в
            круговом циклоне, учитывающая баланс трёх сил: градиента давления,
            Кориолиса и центробежной.
          </li>
          <li>
            <strong>Циклон</strong> — область пониженного давления. В Северном
            полушарии ветер направлен <em>против часовой стрелки</em> и
            закручивается к центру.
          </li>
          <li>
            Учёт центробежной силы уменьшает скорость ветра по сравнению с
            геострофическим (в циклоне).
          </li>
          <li>
            На экваторе f = 0 → циклоны не образуются (нет силы Кориолиса).
          </li>
          <li>
            <strong>Формула</strong>: v = −ωr + √((ωr)² + (r/ρ)·∂p/∂r), где
            ω = Ω·sin φ.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
