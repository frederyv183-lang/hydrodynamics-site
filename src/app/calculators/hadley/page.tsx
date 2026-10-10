import Link from "next/link";
import Formula from "@/components/ui/Formula";
import HadleyCalculator from "@/components/calculators/HadleyCalculator";

export const metadata = {
  title: "Ширина ячейки Хэдли — калькулятор",
  description:
    "Расчёт широты нисходящей ветви ячейки Хэдли по формуле Хельда–Хоу с учётом контраста температур, высоты тропопаузы и средней температуры.",
};

export default function HadleyPage() {
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
        <span className="text-slate-700">Ячейка Хэдли</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold text-brand-900">
        Ширина ячейки Хэдли
      </h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Ячейка Хэдли — тропическая ячейка общей циркуляции атмосферы.
        Формула Хельда–Хоу связывает широту её нисходящей ветви (~30°) с
        контрастом температур экватор-полюс, высотой тропопаузы и средней
        температурой. Калькулятор позволяет варьировать эти параметры и
        сравнить результат с наблюдениями.
      </p>

      <div className="formula-block mt-6">
        <Formula
          latex={String.raw`\phi_H \approx \left( \frac{g H \Delta T}{\Omega^2 a^2 T_0} \right)^{1/4}`}
          display
        />
      </div>

      <div className="mt-8">
        <HadleyCalculator />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-brand-900">Справка</h2>
        <div className="mt-3 space-y-3 text-sm text-slate-700">
          <p>
            <strong>Обозначения:</strong> φ_H — широта нисходящей ветви (в
            радианах); g — ускорение свободного падения (9.81 м/с²);
            H — высота тропопаузы; ΔT — контраст температур экватор-полюс;
            Ω — угловая скорость Земли (7.29·10⁻⁵ с⁻¹); a — радиус Земли
            (6.371·10⁶ м); T₀ — средняя температура.
          </p>
          <p>
            <strong>Физический смысл.</strong> Тёплый воздух поднимается на
            экваторе, растекается к полюсам в верхней тропосфере, остывает
            и опускается. Ширина ячейки определяется балансом между
            термическим градиентом (движет циркуляцию) и эффектом Кориолиса
            (ограничивает её).
          </p>
          <p>
            <strong>Типичные значения:</strong> при ΔT = 40 K, H = 14 км,
            T₀ = 255 K формула даёт φ_H ≈ 30°, что соответствует наблюдениям
            над субтропическими пустынями (Сахара, Аравия, Австралия).
          </p>
          <p>
            <strong>Зависимости:</strong>
          </p>
          <ul className="list-disc pl-5">
            <li>Рост ΔT → ячейка расширяется (актуально для ледниковых эпох);</li>
            <li>Рост H → ячейка расширяется (более высокая тропопауза);</li>
            <li>Рост T₀ → ячейка сужается (при прочих равных).</li>
          </ul>
        </div>
      </section>
    </div>
  );
}