import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { TurbulenceCoefficientCalculator } from "@/components/calculators/TurbulenceCoefficientCalculator";
import { turbulenceCoefficientCalculator } from "@/data/calculators/turbulence-coefficient";

export default function Page() {
  return (
    <CalculatorLayout
      title={turbulenceCoefficientCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: turbulenceCoefficientCalculator.title },
      ]}
      formula={turbulenceCoefficientCalculator.formula}
    >
      <TurbulenceCoefficientCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Коэффициент турбулентности K</strong> — характеристика
            интенсивности турбулентного обмена. Аналогичен коэффициенту
            диффузии и вязкости.
          </li>
          <li>
            <strong>Динамическая скорость v*</strong> — масштаб скорости
            турбулентных пульсаций. v* = √(τ/ρ), где τ — напряжение трения,
            ρ — плотность воздуха.
          </li>
          <li>
            <strong>Формула K = k·v*·z</strong> справедлива при нейтральной
            стратификации в приземном слое (до 50–100 м).
          </li>
          <li>
            При устойчивой стратификации K уменьшается, при неустойчивой —
            растёт (учитывается через поправки Монина-Обухова).
          </li>
          <li>
            <strong>Типичные значения</strong>: K ≈ 0.1…10 м²/с в приземном
            слое, до 100 м²/с в свободной атмосфере.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
