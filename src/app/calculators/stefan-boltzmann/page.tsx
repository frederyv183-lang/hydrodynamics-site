import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { StefanBoltzmannCalculator } from "@/components/calculators/StefanBoltzmannCalculator";
import { stefanBoltzmannCalculator } from "@/data/calculators/stefan-boltzmann";

export default function Page() {
  return (
    <CalculatorLayout
      title={stefanBoltzmannCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: stefanBoltzmannCalculator.title },
      ]}
      formula={stefanBoltzmannCalculator.formula}
    >
      <StefanBoltzmannCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Закон Стефана-Больцмана</strong> — полный поток излучения
            абсолютно чёрного тела пропорционален 4-й степени абсолютной
            температуры.
          </li>
          <li>
            <strong>σ = 5.67×10⁻⁸ Вт/(м²·К⁴)</strong> — универсальная
            постоянная.
          </li>
          <li>
            <strong>Примеры</strong>:
            <ul className="mt-1 list-[circle] pl-5">
              <li>Солнце (T ≈ 6000 K): B ≈ 7.35×10⁷ Вт/м²</li>
              <li>Земля (T ≈ 288 K): B ≈ 390 Вт/м²</li>
              <li>Стратосфера (T ≈ 200 K): B ≈ 91 Вт/м²</li>
            </ul>
          </li>
          <li>
            Для реальных тел: <strong>B = ε·σ·T⁴</strong>, где ε —
            излучательная способность (для воды ≈ 0.98, для снега ≈ 0.99, для
            металлов 0.05…0.3).
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
