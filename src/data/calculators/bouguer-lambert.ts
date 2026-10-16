import type { Calculator } from "@/types/calculator";

export const bouguerLambertCalculator: Calculator = {
  slug: "bouguer-lambert",
  title: "Закон Бугера-Ламберта",
  description:
    "Ослабление солнечной радиации в атмосфере: F = F₀·p^m, где p — коэффициент прозрачности, m = 1/sin(h_c) — масса атмосферы. Расчёт потока на поверхности.",
  badge: "Радиация",
  formula: String.raw`F = F_0 \cdot p^m, \quad m = \frac{1}{\sin h_c}`,
};
