import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import RainbowCalculator from "@/components/calculators/RainbowCalculator";

export const metadata = {
  title: "Радуга — калькулятор"
};

export default function RainbowPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Радуга" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Радуга
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт угла главной и вторичной радуги по показателю преломления воды.
        Учитывается дисперсия: n(λ) по упрощённой формуле Коши.
        Таблица показывает разложение по длинам волн — почему радуга цветная.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center">
        <Formula
          latex={String.raw`\cos\theta = \frac{n^2 - 1}{n^2 + 1}`}
          display
        />
      </div>

      <div className="mt-8">
        <RainbowCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>Угол главной радуги: cos θ = (n² − 1)/(n² + 1) ≈ 42° при n = 1.33</li>
          <li>Угол вторичной радуги: cos θ = √((9 − n²)/8) ≈ 51° при n = 1.33</li>
          <li>Дисперсия: n(λ) уменьшается с ростом λ, поэтому красный снаружи, фиолетовый внутри</li>
          <li>Порядок цветов во вторичной радуге обратный (фиолетовый снаружи)</li>
          <li>Между главной и вторичной радугой — тёмная полоса Александра</li>
        </ul>
      </section>
    </div>
  );
}