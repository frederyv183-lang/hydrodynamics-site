import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import PressureToSeaCalculator from "./PressureToSeaCalculator";

export const metadata = {
  title: "Приведение давления к уровню моря — калькулятор"
};

export default function PressureToSeaPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Приведение давления к уровню моря" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Приведение давления к уровню моря
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт давления на уровне моря по давлению, высоте и температуре на
        станции. Соответствует Заданию 1 методических указаний РГГМУ по «Физике
        атмосферы». При определении средней барометрической температуры
        используется линейный закон падения температуры со средним для
        тропосферы градиентом 0.65 °C/100 м.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
        <Formula
          latex={String.raw`z = B (1 + \alpha t_m) \lg \frac{p_0}{p}`}
          display
        />
      </div>

      <div className="mt-8">
        <PressureToSeaCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Как считается</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>Формула Лапласа (полная барометрическая формула)</li>
          <li>B ≈ 18400 м — барометрическая постоянная</li>
          <li>α = 1/273.15 ≈ 0.00366 °C⁻¹</li>
          <li>
            t_m = t + γ·z/2 — средняя барометрическая температура слоя
          </li>
          <li>
            По умолчанию γ = 0.65 °C/100 м — средний градиент тропосферы
          </li>
        </ul>
      </section>
    </div>
  );
}
