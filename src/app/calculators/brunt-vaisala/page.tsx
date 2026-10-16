import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { BruntVaisalaCalculator } from "@/components/calculators/BruntVaisalaCalculator";
import { bruntVaisalaCalculator } from "@/data/calculators/brunt-vaisala";

export default function Page() {
  return (
    <CalculatorLayout
      title={bruntVaisalaCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: bruntVaisalaCalculator.title },
      ]}
      formula={bruntVaisalaCalculator.formula}
    >
      <BruntVaisalaCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Частота Брента-Вяйсяля N</strong> — собственная частота
            плавучих колебаний частицы воздуха в устойчиво стратифицированной
            среде.
          </li>
          <li>
            <strong>N = √((g/θ)·∂θ/∂z)</strong>, где θ — потенциальная
            температура, ∂θ/∂z — её вертикальный градиент.
          </li>
          <li>
            <strong>Период</strong> T = 2π/N. При N ≈ 0.01 с⁻¹ период ≈ 10
            мин — типичное значение для тропосферы.
          </li>
          <li>
            <strong>Применение</strong>: теория внутренних гравитационных волн,
            оценка устойчивости атмосферы, турбулентность ясного неба (CAT),
            распространение волн в океане и атмосфере.
          </li>
          <li>
            При <strong>∂θ/∂z &lt; 0</strong> — N мнимое, стратификация
            неустойчива, развивается конвекция.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
