import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import WindProfileCalculator from "@/components/calculators/WindProfileCalculator";

export const metadata = {
  title: "Профиль ветра в пограничном слое — калькулятор"
};

export default function WindProfilePage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Профиль ветра" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Профиль ветра в пограничном слое
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт скорости ветра на заданной высоте по логарифмическому профилю.
        Используется для оценки ветровых условий в приземном слое атмосферы
        (0–100 м) при нейтральной стратификации.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center">
        <Formula
          latex={String.raw`u(z) = \frac{u_*}{\kappa} \ln\left( \frac{z}{z_0} \right)`}
          display
        />
      </div>

      <div className="mt-8">
        <WindProfileCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>κ = 0.4 — константа Кармана</li>
          <li>z0 зависит от поверхности: трава 0.03 м, лес 1 м, город 2 м</li>
          <li>Формула справедлива для нейтральной стратификации</li>
          <li>Ri &lt; 0 — неустойчиво, Ri &gt; 0.25 — устойчиво</li>
        </ul>
      </section>
    </div>
  );
}