import type { Calculator } from "@/types/calculator";

export const richardsonCalculator: Calculator = {
  slug: "richardson",
  title: "Число Ричардсона",
  description:
    "Расчёт Ri = (g/T)·(γ_a − γ)/(∂u/∂z)². Критерий турбулентности и устойчивости атмосферы: Ri < 0 — неустойчиво, Ri > 0.25 — устойчиво.",
  badge: "Динамика",
  formula: String.raw`Ri = \frac{g}{T}\cdot\frac{\gamma_a - \gamma}{\left(\partial u/\partial z\right)^2}`,
};
