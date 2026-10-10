import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import ReynoldsCalculator from "./ReynoldsCalculator";

export const metadata = {
  title: "Число Рейнольдса — калькулятор"
};

export default function ReynoldsPage() {
  return (
    <div className="max-w-4xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Число Рейнольдса" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Число Рейнольдса
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Число Рейнольдса — безразмерная величина, определяющая режим течения.
        Малые значения соответствуют ламинарному течению, большие —
        турбулентному.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
        <Formula latex={String.raw`Re = \frac{\rho v L}{\mu}`} display />
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
          Re &lt; 2300 — ламинарный
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">
          2300 ≤ Re ≤ 4000 — переходный
        </span>
        <span className="rounded-full bg-rose-50 px-3 py-1 font-medium text-rose-700">
          Re &gt; 4000 — турбулентный
        </span>
      </div>

      <div className="mt-8">
        <ReynoldsCalculator />
      </div>
    </div>
  );
}
