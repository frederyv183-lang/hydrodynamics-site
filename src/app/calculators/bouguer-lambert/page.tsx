import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { BouguerLambertCalculator } from "@/components/calculators/BouguerLambertCalculator";
import { bouguerLambertCalculator } from "@/data/calculators/bouguer-lambert";

export default function Page() {
  return (
    <CalculatorLayout
      title={bouguerLambertCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: bouguerLambertCalculator.title },
      ]}
      formula={bouguerLambertCalculator.formula}
    >
      <BouguerLambertCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Закон Бугера-Ламберта</strong> описывает ослабление
            солнечной радиации при прохождении через атмосферу: F = F₀·p^m.
          </li>
          <li>
            <strong>m = 1/sin(h_c)</strong> — относительная оптическая масса
            атмосферы. При h_c = 90° (зенит) m = 1, при h_c = 30° m = 2, при
            h_c = 5° m ≈ 11.5.
          </li>
          <li>
            <strong>Коэффициент прозрачности p</strong>:
            <ul className="mt-1 list-[circle] pl-5">
              <li>p ≈ 0.5 — сильно замутнённая атмосфера</li>
              <li>p ≈ 0.7 — средние условия</li>
              <li>p ≈ 0.85 — прозрачная</li>
              <li>p ≈ 0.95 — очень прозрачная (высокогорье)</li>
            </ul>
          </li>
          <li>
            На горизонтальную поверхность приходит F' = F·sin(h_c). Поэтому
            максимум F' достигается в полдень, когда h_c максимальна.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
