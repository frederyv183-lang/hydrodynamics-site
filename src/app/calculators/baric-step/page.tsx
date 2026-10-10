import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import BaricStepCalculator from "./BaricStepCalculator";

export const metadata = {
  title: "Барическая ступень — калькулятор"
};

export default function BaricStepPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Барическая ступень" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">Барическая ступень</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Барическая ступень — высота, на которую нужно подняться с исходного
        уровня, чтобы давление упало на 1 мб. Зависит только от плотности
        воздуха: чем меньше плотность, тем больше ступень.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
        <Formula
          latex={String.raw`h = \frac{1}{g\rho} = \frac{H_0}{p}(1 + \alpha t)`}
          display
        />
      </div>

      <div className="mt-8">
        <BaricStepCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Физический смысл</h2>
        <p className="mt-2 text-sm text-slate-700">
          В тёплой воздушной массе плотность меньше, ступень больше — давление
          падает с высотой медленнее. В холодной воздушной массе — наоборот.
          Барическая ступень широко используется в практике: по разности
          давления между двумя уровнями приближённо оценивают превышение.
        </p>
      </section>
    </div>
  );
}
