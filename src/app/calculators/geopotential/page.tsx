import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { GeopotentialCalculator } from "@/components/calculators/GeopotentialCalculator";
import { geopotentialCalculator } from "@/data/calculators/geopotential";

export default function Page() {
  return (
    <CalculatorLayout
      title={geopotentialCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: geopotentialCalculator.title },
      ]}
      formula={geopotentialCalculator.formula}
    >
      <GeopotentialCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Геопотенциал Φ</strong> — потенциальная энергия единицы
            массы в поле силы тяжести. Измеряется в Дж/кг = м²/с².
          </li>
          <li>
            <strong>Φ = ∫g·dz</strong> — работа против силы тяжести при подъёме
            единицы массы с высоты 0 до z.
          </li>
          <li>
            <strong>Геопотенциальная высота</strong> H = Φ/g₀ — «эквивалентная»
            высота в однородном поле тяжести. На высотах до 11 км H ≈ z с
            точностью до 0.1%.
          </li>
          <li>
            <strong>Используется</strong> в синоптической метеорологии: карты
            барической топографии строятся в геопотенциальных высотах
            (H₅₀₀, H₈₅₀ и др.).
          </li>
          <li>
            На больших высотах (в термосфере) g заметно уменьшается: на 100 км
            — на 3%, на 1000 км — на 27%.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
