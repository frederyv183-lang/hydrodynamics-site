import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";
import { MinTempForecastCalculator } from "@/components/calculators/MinTempForecastCalculator";
import { minTempForecastCalculator } from "@/data/calculators/min-temp-forecast";

export default function Page() {
  return (
    <CalculatorLayout
      title={minTempForecastCalculator.title}
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: minTempForecastCalculator.title },
      ]}
      formula={minTempForecastCalculator.formula}
    >
      <MinTempForecastCalculator />

      <section className="mt-10 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Справка</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Метод Зверева</strong> — классический метод прогноза
            минимальной температуры воздуха у земли в ясную тихую ночь. Основан
            на данных дневной станции (13:00) и учитывает дефицит точки росы.
          </li>
          <li>
            Чем <em>суше</em> воздух (больше дефицит T₁₃ − T_d₁₃), тем сильнее
            ночное выхолаживание и тем ниже T_min.
          </li>
          <li>
            <strong>Формула Михельсона</strong> — простой метод прогноза
            заморозков по точке росы вечернего срока (21:00):
            T_min = T_d₂₁ − 2.
          </li>
          <li>
            <strong>Поправка «−6»</strong> в формуле Зверева — эмпирическая.
            В разных руководствах её значение варьируется от −2 до −8 в
            зависимости от сезона, широты и синоптической ситуации.
          </li>
          <li>
            <strong>Заморозок</strong> — понижение T_min ниже 0 °C в тёплый
            период года (весна, осень, иногда лето). Опасен для
            сельскохозяйственных культур.
          </li>
        </ul>
      </section>
    </CalculatorLayout>
  );
}
