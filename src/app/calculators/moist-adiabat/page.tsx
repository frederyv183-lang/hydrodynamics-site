import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { MoistAdiabatCalculator } from "@/components/calculators/MoistAdiabatCalculator";
import { moistAdiabatCalculator } from "@/data/calculators/moist-adiabat";

export default function Page() {
  return (
    <CalculatorLayout
      title={moistAdiabatCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: moistAdiabatCalculator.title },
      ]}
      formula={moistAdiabatCalculator.formula}
    >
      <MoistAdiabatCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Влажноадиабатический градиент</strong> γ′ — скорость
            изменения температуры насыщенного воздуха при адиабатическом
            подъёме. Меньше сухоадиабатического γ_a ≈ 0.98 °C/100 м, потому
            что часть тепла компенсируется выделением при конденсации.
          </li>
          <li>
            Чем выше температура — тем больше E_s(T), тем больше влаги, и тем
            меньше γ′. При −30 °C γ′ ≈ γ_a.
          </li>
          <li>
            Чем ниже давление (выше высота) — тем меньше γ′, потому что воздух
            расширяется сильнее.
          </li>
          <li>
            Используется для расчёта конвективной неустойчивости, уровня
            конденсации, мощности кучевых облаков и гроз.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
