import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { KineticHeatingCalculator } from "@/components/calculators/KineticHeatingCalculator";
import { kineticHeatingCalculator } from "@/data/calculators/kinetic-heating";

export default function Page() {
  return (
    <CalculatorLayout
      title={kineticHeatingCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: kineticHeatingCalculator.title },
      ]}
      formula={kineticHeatingCalculator.formula}
    >
      <KineticHeatingCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Кинетический нагрев</strong> — повышение температуры
            обшивки самолёта из-за трения воздуха при полёте на высокой
            скорости.
          </li>
          <li>
            Формула ΔT = V²/2000 (V в м/с) даёт нагрев в °C относительно
            температуры окружающего воздуха.
          </li>
          <li>
            <strong>Дозвуковые самолёты</strong>: V ≈ 800–900 км/ч → ΔT ≈
            25–30 °C. Учитывается, но не критично.
          </li>
          <li>
            <strong>Сверхзвуковые</strong>: V ≈ 2000–3000 км/ч → ΔT ≈ 150–350
            °C. Требуется теплозащита (титан, керамика).
          </li>
          <li>
            <strong>Гиперзвуковые</strong>: V > 6000 км/ч → ΔT > 1000 °C.
            Используются абляционные покрытия.
          </li>
          <li>
            Пример: <em>Concorde</em> на V = 2 Маха (~2150 км/ч) нагревался до
            +120 °C, обшивка удлинялась на 25 см.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
