import type { Calculator } from "@/types/calculator";

export const fogForecastCalculator: Calculator = {
  slug: "fog-forecast",
  title: "Прогноз тумана (метод Петренко)",
  description:
    "Прогноз температуры туманообразования: T_r = T_d − ΔT_d. Учитывает дефицит точки росы и позволяет оценить вероятность образования тумана к утру.",
  badge: "Прогноз",
  formula: String.raw`T_r = T_d - \Delta T_d`,
};
