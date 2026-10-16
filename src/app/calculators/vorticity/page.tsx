import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { VorticityCalculator } from "@/components/calculators/VorticityCalculator";
import { vorticityCalculator } from "@/data/calculators/vorticity";

export default function Page() {
  return (
    <CalculatorLayout
      title={vorticityCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: vorticityCalculator.title },
      ]}
      formula={vorticityCalculator.formula}
    >
      <VorticityCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Уравнение вихря</strong> — одно из ключевых уравнений
            динамической метеорологии. Описывает изменение абсолютного вихря
            (ζ + f) во времени.
          </li>
          <li>
            <strong>ζ</strong> — относительный вихрь (вращение воздуха
            относительно Земли).
            <strong>f</strong> — планетарный вихрь (вращение Земли, f = 2Ω·sin φ).
          </li>
          <li>
            <strong>D</strong> — дивергенция (расходимость) горизонтального
            ветра.
          </li>
          <li>
            <strong>D &gt; 0</strong> (дивергенция) → вихрь затухает.
            <strong>D &lt; 0</strong> (конвергенция) → вихрь усиливается.
          </li>
          <li>
            Уравнение объясняет: циклогенез (усиление вихря при сходимости),
            антициклогенез, поведение струйных течений.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
