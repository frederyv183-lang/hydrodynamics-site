import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { TakeoffSpeedCalculator } from "@/components/calculators/TakeoffSpeedCalculator";
import { takeoffSpeedCalculator } from "@/data/calculators/takeoff-speed";

export default function Page() {
  return (
    <CalculatorLayout
      title={takeoffSpeedCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: takeoffSpeedCalculator.title },
      ]}
      formula={takeoffSpeedCalculator.formula}
    >
      <TakeoffSpeedCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            V_отр — минимальная скорость, при которой подъёмная сила
            уравновешивает вес: Y = G.
          </li>
          <li>
            Формула: V_отр = √(2G / (c_y · S · ρ)), где G — вес (Н), S —
            площадь крыла (м²), c_y — коэффициент подъёмной силы, ρ —
            плотность воздуха (кг/м³).
          </li>
          <li>
            При увеличении температуры плотность воздуха падает, и V_отр
            растёт. Поэтому в жаркую погоду и в горах требуется большая
            скорость отрыва и более длинная ВПП.
          </li>
          <li>
            Типичные значения для пассажирских самолётов: 250–300 км/ч.
          </li>
          <li>
            Плотность воздуха: ρ = p / (R·T), где R = 287.05 Дж/(кг·К) —
            удельная газовая постоянная сухого воздуха.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
