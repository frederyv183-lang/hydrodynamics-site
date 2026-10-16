import type { Calculator } from "@/types/calculator";

export const windForecastCalculator: Calculator = {
  slug: "wind-forecast",
  title: "Прогноз скорости ветра",
  description:
    "Связь скорости ветра с барической тенденцией: U = k·Δp. Эмпирический метод Богаткина для оценки усиления ветра при росте градиента давления.",
  badge: "Прогноз",
  formula: String.raw`U = k \cdot \Delta p`,
};
