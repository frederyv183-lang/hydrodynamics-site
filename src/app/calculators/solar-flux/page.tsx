import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import SolarFluxCalculator from "./SolarFluxCalculator";

export const metadata = {
  title: "Поток солнечной радиации — калькулятор"
};

export default function SolarFluxPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Поток солнечной радиации" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Поток солнечной радиации
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт потока солнечной радиации на горизонтальную поверхность и массы
        атмосферы по высоте Солнца.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
        <Formula
          latex={String.raw`F' = F_0 \sin h_c, \quad m = \frac{1}{\sin h_c}`}
          display
        />
      </div>

      <div className="mt-8">
        <SolarFluxCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>F₀* — солнечная постоянная, ≈ 1.98 кал/(см²·мин) = 1367 Вт/м²</li>
          <li>Поток на горизонтальную поверхность пропорционален sin h_c</li>
          <li>Масса атмосферы m = 1/sin h_c применима при h_c &gt; 30°</li>
          <li>При h_c = 0° m ≈ 35.4 (в 35 раз больше, чем в зените)</li>
        </ul>
      </section>
    </div>
  );
}
