import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import HygroCalculator from "./HygroCalculator";

export const metadata = {
  title: "Гигрометрические характеристики — калькулятор"
};

export default function HygroPage() {
  return (
    <div className="max-w-4xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Гигрометрические характеристики" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Гигрометрические характеристики
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт всех характеристик влажности воздуха по температуре, точке
        росы и давлению. Соответствует Заданию 3 методических указаний РГГМУ
        по «Физике атмосферы».
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
        <Formula latex={String.raw`e = E(t_d), \quad f = \frac{e}{E(t)} \cdot 100\%`} display />
      </div>

      <div className="mt-8">
        <HygroCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Что считается</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>Упругость водяного пара e (формула Магнуса)</li>
          <li>Упругость насыщения E(t)</li>
          <li>Относительная влажность f, %</li>
          <li>Дефицит влажности d = E − e</li>
          <li>Удельная влажность s и отношение смеси r</li>
          <li>Абсолютная влажность a</li>
          <li>Виртуальная температура T_v и добавок ΔT_v</li>
          <li>Плотность влажного воздуха ρ</li>
          <li>Барическая ступень h</li>
        </ul>
      </section>
    </div>
  );
}
