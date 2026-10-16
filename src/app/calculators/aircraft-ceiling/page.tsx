import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { AircraftCeilingCalculator } from "@/components/calculators/AircraftCeilingCalculator";
import { aircraftCeilingCalculator } from "@/data/calculators/aircraft-ceiling";

export default function Page() {
  return (
    <CalculatorLayout
      title={aircraftCeilingCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: aircraftCeilingCalculator.title },
      ]}
      formula={aircraftCeilingCalculator.formula}
    >
      <AircraftCeilingCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Потолок самолёта</strong> — максимальная высота, на которой
            самолёт ещё может держаться в горизонтальном полёте.
          </li>
          <li>
            <strong>Стандартный потолок</strong> H_пот,са определён для
            стандартной атмосферы (p₀ = 760 мм рт. ст., T_трп = −56.5 °C).
          </li>
          <li>
            <strong>Фактический потолок</strong> ниже стандартного при:
            пониженном давлении на аэродроме (высокогорье),
            повышенной температуре тропопаузы.
          </li>
          <li>
            Эмпирические коэффициенты: 10 м на 1 мм рт. ст. отклонения
            давления, 80 м на 1 °C отклонения температуры тропопаузы.
          </li>
          <li>
            Учитывается при планировании дальних рейсов, расчёте запаса
            топлива и выборе эшелона.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
