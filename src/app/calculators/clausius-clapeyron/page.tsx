import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { ClausiusClapeyronCalculator } from "@/components/calculators/ClausiusClapeyronCalculator";
import { clausiusClapeyronCalculator } from "@/data/calculators/clausius-clapeyron";

export default function Page() {
  return (
    <CalculatorLayout
      title={clausiusClapeyronCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: clausiusClapeyronCalculator.title },
      ]}
      formula={clausiusClapeyronCalculator.formula}
    >
      <ClausiusClapeyronCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Уравнение Клаузиуса-Клапейрона</strong> описывает
            зависимость давления насыщенного пара от температуры при фазовом
            равновесии.
          </li>
          <li>
            <strong>Упругость насыщения E(T)</strong> растёт экспоненциально с
            температурой. При +20 °C E ≈ 23.4 гПа, при 0 °C — 6.11 гПа, при
            −20 °C — 1.25 гПа.
          </li>
          <li>
            Над <strong>льдом</strong> E(T) меньше, чем над водой. Это создаёт
            разность давлений, приводящую к росту ледяных кристаллов за счёт
            испарения капель — <em>эффект Вегенера-Бержерона</em> (важен для
            образования осадков).
          </li>
          <li>
            <strong>Применение</strong>: расчёт точки росы, влажности, условий
            конденсации, роста облачных капель, прогноз тумана.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
