import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { RelativeGeopotentialCalculator } from "@/components/calculators/RelativeGeopotentialCalculator";
import { relativeGeopotentialCalculator } from "@/data/calculators/relative-geopotential";

export default function Page() {
  return (
    <CalculatorLayout
      title={relativeGeopotentialCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: relativeGeopotentialCalculator.title },
      ]}
      formula={relativeGeopotentialCalculator.formula}
    >
      <RelativeGeopotentialCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Относительный геопотенциал</strong> — толщина слоя между
            двумя изобарическими поверхностями в стандартном поле тяжести.
          </li>
          <li>
            <strong>Формула</strong>: H_{p1}^{p2} = (R/g₀)·∫T·d ln p. При T =
            const: H = (R·T/g₀)·ln(p₁/p₂).
          </li>
          <li>
            <strong>Физический смысл</strong>: чем теплее слой, тем он толще
            (при одном и том же перепаде давления). Это ключевой инструмент
            термического анализа в синоптической метеорологии.
          </li>
          <li>
            <strong>Типичные значения</strong>:
            <ul className="mt-1 list-[circle] pl-5">
              <li>H₈₅₀^1000 ≈ 1300–1500 гп. м</li>
              <li>H₅₀₀^1000 ≈ 5200–5700 гп. м</li>
            </ul>
          </li>
          <li>
            Используется для построения карт относительной топографии
            (ОТ-500/1000) — они показывают распределение средней температуры
            слоя и адвекцию тепла/холода.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
