import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import ExtinctionCalculator from "./ExtinctionCalculator";

export const metadata = {
  title: "Ослабление солнечной радиации — калькулятор"
};

export default function ExtinctionPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Ослабление солнечной радиации" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Ослабление солнечной радиации
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Расчёт потока солнечной радиации на земной поверхности по закону
        Ламберта-Бугера (Буге) с учётом оптической толщины атмосферы и высоты
        Солнца.
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
        <Formula
          latex={String.raw`F = F_0 \cdot p^m, \quad m = \frac{1}{\sin h_c}`}
          display
        />
      </div>

      <div className="mt-8">
        <ExtinctionCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>p = 0.5 — очень мутная атмосфера (пыль, дым)</li>
          <li>p = 0.7 — средние условия</li>
          <li>p = 0.85 — прозрачная атмосфера (горы, Арктика)</li>
          <li>Оптическая толщина τ = −ln p</li>
        </ul>
      </section>
    </div>
  );
}
