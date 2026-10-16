import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { IcingIntensityCalculator } from "@/components/calculators/IcingIntensityCalculator";
import { icingIntensityCalculator } from "@/data/calculators/icing-intensity";

export default function Page() {
  return (
    <CalculatorLayout
      title={icingIntensityCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: icingIntensityCalculator.title },
      ]}
      formula={icingIntensityCalculator.formula}
    >
      <IcingIntensityCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Обледенение</strong> — нарастание льда на обшивке самолёта
            при полёте в переохлаждённых облаках или осадках (T от 0 до −20 °C).
          </li>
          <li>
            <strong>Интенсивность I</strong> — толщина льда, нарастающего за
            единицу времени. Измеряется в мм/мин.
          </li>
          <li>
            <strong>Классификация</strong>:
            <ul className="mt-1 list-[circle] pl-5">
              <li>I &lt; 0.5 мм/мин — слабое (эпизодическое)</li>
              <li>0.5…1.5 мм/мин — умеренное (нужна ПОС)</li>
              <li>I &gt; 1.5 мм/мин — сильное (немедленный уход)</li>
            </ul>
          </li>
          <li>
            <strong>Факторы</strong>: водность облака w, скорость V, размер
            капель, форма профиля, температура.
          </li>
          <li>
            <strong>Опасности</strong>: ухудшение аэродинамики, потеря
            подъёмной силы, дисбаланс, отказ датчиков, обледенение
            карбюратора.
          </li>
          <li>
            <strong>Защита</strong>: ПОС (противообледенительная система) —
            тепловая, химическая, механическая.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
