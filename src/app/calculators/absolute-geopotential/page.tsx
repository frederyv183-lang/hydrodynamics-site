import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { AbsoluteGeopotentialCalculator } from "@/components/calculators/AbsoluteGeopotentialCalculator";
import { absoluteGeopotentialCalculator } from "@/data/calculators/absolute-geopotential";

export default function Page() {
  return (
    <CalculatorLayout
      title={absoluteGeopotentialCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: absoluteGeopotentialCalculator.title },
      ]}
      formula={absoluteGeopotentialCalculator.formula}
    >
      <AbsoluteGeopotentialCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Абсолютный геопотенциал H_p</strong> — высота изобарической
            поверхности p над уровнем моря в стандартном поле тяжести.
          </li>
          <li>
            <strong>Формула</strong>: H_p = (R/g₀)·∫T·d ln p. При T = const:
            H_p = (R·T/g₀)·ln(p₀/p).
          </li>
          <li>
            <strong>Единицы</strong>: геопотенциальные метры (гп. м), обычно
            совпадают с обычными метрами с точностью до 0.1%.
          </li>
          <li>
            <strong>Типичные значения</strong>:
            <ul className="mt-1 list-[circle] pl-5">
              <li>H₈₅₀ ≈ 1500 гп. м</li>
              <li>H₇₀₀ ≈ 3000 гп. м</li>
              <li>H₅₀₀ ≈ 5500 гп. м</li>
              <li>H₃₀₀ ≈ 9000 гп. м</li>
            </ul>
          </li>
          <li>
            Карты барической топографии (АТ-500, АТ-850) строятся именно в
            геопотенциальных высотах.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
