import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { GradientWindAnticycloneCalculator } from "@/components/calculators/GradientWindAnticycloneCalculator";
import { gradientWindAnticycloneCalculator } from "@/data/calculators/gradient-wind-anticyclone";

export default function Page() {
  return (
    <CalculatorLayout
      title={gradientWindAnticycloneCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: gradientWindAnticycloneCalculator.title },
      ]}
      formula={gradientWindAnticycloneCalculator.formula}
    >
      <GradientWindAnticycloneCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Антициклон</strong> — область повышенного давления. Ветер
            направлен <em>по часовой стрелке</em> в Северном полушарии, с
            отклонением от центра.
          </li>
          <li>
            <strong>Условие устойчивости</strong>: (ωr)² ≥ (r/ρ)·∂p/∂r. При
            больших градиентах антициклон не может существовать — это
            объясняет, почему в антициклонах градиенты давления обычно
            слабее, чем в циклонах.
          </li>
          <li>
            <strong>Физический смысл</strong>: в антициклоне центробежная
            сила и градиент давления направлены в одну сторону (от центра), а
            сила Кориолиса — к центру. Баланс возможен только при
            ограниченном градиенте.
          </li>
          <li>
            <strong>Формула</strong>: v = ωr − √((ωr)² − (r/ρ)·∂p/∂r).
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
