import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import DispersionCalculator from "@/components/calculators/DispersionCalculator";

export const metadata = {
  title: "Рассеивание примеси — калькулятор"
};

export default function DispersionPage() {
  return (
    <div className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/calculators", label: "Калькуляторы" },
          { label: "Рассеивание примеси" }
        ]}
      />
      <h1 className="text-3xl font-bold text-brand-900">
        Рассеивание примеси в атмосфере
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Гауссова модель факела: расчёт приземной концентрации примеси
        от непрерывного точечного источника. Учитывается мощность источника Q,
        скорость ветра u, высота источника H и класс устойчивости атмосферы (A–F).
      </p>

      <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center">
        <Formula
          latex={String.raw`C(x) = \frac{Q}{\pi u \sigma_y \sigma_z} \exp\!\left( -\frac{H^2}{2\sigma_z^2} \right)`}
          display
        />
      </div>

      <div className="mt-8">
        <DispersionCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li>Гауссова модель: концентрация распределена по нормальному закону</li>
          <li>σ_y и σ_z — дисперсии по осям y и z, зависят от x и класса устойчивости</li>
          <li>Классы устойчивости A–F (Паскуилл): A — очень неустойчивая, F — устойчивая</li>
          <li>Приземная концентрация C = Q/(π·u·σ_y·σ_z) · exp(−H²/(2σ_z²))</li>
          <li>Аппроксимации σ_y(x), σ_z(x): Turner (1970), Briggs (1973)</li>
        </ul>
      </section>
    </div>
  );
}