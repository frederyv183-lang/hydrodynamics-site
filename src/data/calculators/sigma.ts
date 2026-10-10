import type { Calculator } from "@/types/calculator";

export const sigmaCalculator: Calculator = {
  slug: "sigma",
  title: "Приведённое давление σ",
  description:
    "Расчёт σ-координаты: отношение давления на уровне к приземному давлению.",
  badge: "Координаты",
  formula: String.raw`\sigma = \frac{p}{p_s}`,
};
