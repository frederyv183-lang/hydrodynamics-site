import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { RichardsonCalculator } from "@/components/calculators/RichardsonCalculator";
import { richardsonCalculator } from "@/data/calculators/richardson";

export default function Page() {
  return (
    <CalculatorLayout
      title={richardsonCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: richardsonCalculator.title },
      ]}
      formula={richardsonCalculator.formula}
    >
      <RichardsonCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Число Ричардсона Ri</strong> — безразмерный критерий
            устойчивости атмосферы, учитывающий одновременно термическую
            стратификацию (γ) и динамический сдвиг ветра (∂u/∂z).
          </li>
          <li>
            Ri &lt; 0 — <strong>неустойчивая стратификация</strong>: конвекция,
            термики, кучевые облака, возможны грозы.
          </li>
          <li>
            0 &lt; Ri &lt; 0.25 — <strong>переходная зона</strong>:
            турбулентность возможна при достаточном сдвиге.
          </li>
          <li>
            Ri &gt; 0.25 — <strong>устойчивая стратификация</strong>:
            турбулентность подавлена, типичны инверсии, слабый ветер, дымка.
          </li>
          <li>
            Используется в моделях пограничного слоя, прогнозе болтанки,
            рассеивания примесей и оценке условий для авиации.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
