import type { Calculator } from "@/types/calculator";

export const fogVisibilityCalculator: Calculator = {
  slug: "fog-visibility",
  title: "Видимость в тумане",
  description:
    "Связь метеорологической дальности видимости и водности тумана: S_m = 60/√q. Позволяет оценить условия видимости по данным о водности.",
  badge: "Прогноз",
  formula: String.raw`S_m = \frac{60}{\sqrt{q}}`,
};
