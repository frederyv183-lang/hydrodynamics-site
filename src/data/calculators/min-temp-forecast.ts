import type { Calculator } from "@/types/calculator";

export const minTempForecastCalculator: Calculator = {
  slug: "min-temp-forecast",
  title: "Прогноз минимальной температуры",
  description:
    "Ночное выхолаживание по методу Зверева: T_min = T₁₃ − 0.5·(T₁₃ − T_d₁₃) − 6. Дополнительно — формула Михельсона для прогноза заморозков: T_min = T_d₂₁ − 2.",
  badge: "Прогноз",
  formula: String.raw`T_{\min} = T_{13} - 0{,}5\,(T_{13} - T_{d13}) - 6`,
};
