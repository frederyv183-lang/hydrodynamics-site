import Link from "next/link";
import Formula from "@/components/ui/Formula";
import StokesCalculator from "@/components/calculators/StokesCalculator";

export const metadata = {
  title: "Скорость падения капли (закон Стокса) — калькулятор",
  description:
    "Расчёт скорости установившегося падения облачной капли по закону Стокса с учётом вязкости воздуха и проверкой применимости формулы через число Рейнольдса.",
};

export default function StokesPage() {
  return (
    <div className="max-w-3xl">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-brand-700">
          Калькуляторы
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">Скорость падения капли</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold text-brand-900">
        Скорость падения капли (закон Стокса)
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Для мелких облачных капель (r &lt; 40 мкм) сила тяжести уравновешивается
        силой вязкого сопротивления. Скорость установившегося падения описывается
        законом Стокса. Калькулятор учитывает зависимость вязкости воздуха от
        температуры и проверяет применимость формулы через число Рейнольдса.
      </p>

      <div className="formula-block mt-6">
        <Formula
          latex={String.raw`v = \frac{2 r^2 (\rho_w - \rho_a) g}{9 \eta}`}
          display
        />
      </div>

      <div className="mt-8">
        <StokesCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-brand-900">Справка</h2>
        <div className="mt-3 space-y-3 text-sm text-slate-700">
          <p>
            <strong>Обозначения:</strong> r — радиус капли; ρ_w — плотность воды
            (≈ 1000 кг/м³); ρ_a — плотность воздуха; g — ускорение свободного
            падения; η — динамическая вязкость воздуха.
          </p>
          <p>
            <strong>Вязкость воздуха</strong> зависит от температуры и
            рассчитывается по формуле Сазерленда:
          </p>
          <Formula
            latex={String.raw`\eta(T) = \eta_0 \cdot \left(\frac{T}{T_0}\right)^{3/2} \cdot \frac{T_0 + S}{T + S}`}
            display
          />
          <p>
            где η₀ = 1.716·10⁻⁵ Па·с, T₀ = 273.15 K, S = 110.4 K.
          </p>
          <p>
            <strong>Число Рейнольдса</strong> капли Re = v·r / ν позволяет оценить
            применимость закона Стокса:
          </p>
          <ul className="list-disc pl-5">
            <li>Re &lt; 1 — закон Стокса применим, ошибка &lt; 5 %;</li>
            <li>Re &gt; 1 — реальная скорость ниже расчётной, для капель
              r &gt; 40 мкм нужно использовать квадратичный закон сопротивления
              или эмпирические формулы.</li>
          </ul>
          <p>
            <strong>Типичные значения:</strong> r = 10 мкм, T = 20 °C → v ≈ 1.2 см/с;
            r = 40 мкм → v ≈ 19 см/с (Re ≈ 0.4); r = 100 мкм → реальная v ≈ 70 см/с
            (Стокс даёт завышенную оценку ≈ 1.2 м/с).
          </p>
        </div>
      </section>
    </div>
  );
}