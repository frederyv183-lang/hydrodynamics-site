import type { Calculator } from "@/types/calculator";

export const tmaxForecastCalculator: Calculator = {
  slug: "tmax-forecast",
  title: "Прогноз максимальной температуры",
  description:
    "Прогноз максимальной температуры воздуха: T_max = T₇₀₀ + 23. Простой метод Богаткина для дневного прогрева по температуре на изобарической поверхности 700 гПа.",
  badge: "Прогноз",
  formula: String.raw`T_{\max} = T_{700} + 23`,
};
