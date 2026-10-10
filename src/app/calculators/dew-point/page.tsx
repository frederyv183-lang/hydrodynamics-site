import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import DewPointCalculator from "@/components/calculators/DewPointCalculator";

export const metadata = {
  title: "Точка росы — калькулятор"
};

export default function DewPointPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Точка росы" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Точка росы
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт упругости насыщения E_s(T) по формуле Магнуса, фактической
        упругости пара E = RH·E_s/100, точки росы T_d (обратная формула
        Магнуса) и дефицита точки росы T − T_d.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center">
        <Formula
          latex={String.raw`E(T) = 6.112 \cdot \exp\!\left( \frac{17.67 \cdot T}{T + 243.5} \right)`}
          display
        />
      </div>

      <div className="mt-8">
        <DewPointCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>Формула Магнуса: E_s(T), T в °C, E_s в гПа</li>
          <li>Обратная Магнуса: T_d(E) — по фактической упругости пара</li>
          <li>При RH = 100 % точка росы совпадает с температурой воздуха</li>
          <li>Дефицит точки росы T − T_d: чем больше, тем суше воздух</li>
          <li>Диапазон применимости: −40…+50 °C, точность ~0.1 %</li>
        </ul>
      </section>
    </div>
  );
}