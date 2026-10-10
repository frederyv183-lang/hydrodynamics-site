import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import PotentialTempCalculator from "./PotentialTempCalculator";

export const metadata = {
  title: "Потенциальная температура — калькулятор"
};

export default function PotentialTempPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Потенциальная температура" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Потенциальная температура
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт потенциальной температуры по текущим значениям температуры и
        давления. Потенциальная температура — консервативная характеристика
        воздушной массы, используется при анализе устойчивости атмосферы.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
        <Formula
          latex={String.raw`\theta = T \left( \frac{1000}{p} \right)^{\frac{\chi - 1}{\chi}}`}
          display
        />
      </div>

      <div className="mt-8">
        <PotentialTempCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>θ = T при p = 1000 мб</li>
          <li>При p &lt; 1000 мб: θ &gt; T (сжатие при опускании нагревает)</li>
          <li>χ = c_p/c_v ≈ 1.40, (χ−1)/χ ≈ 0.286</li>
          <li>γ_a = g/c_p ≈ 0.98 °C/100 м</li>
        </ul>
      </section>
    </div>
  );
}
