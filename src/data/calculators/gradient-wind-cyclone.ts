import type { Calculator } from "@/types/calculator";

export const gradientWindCycloneCalculator: Calculator = {
  slug: "gradient-wind-cyclone",
  title: "Градиентный ветер (циклон)",
  description:
    "Скорость градиентного ветра в круговом циклоне: v = −ωr + √((ωr)² + (r/ρ)·∂p/∂r). Учитывает баланс сил Кориолиса, градиента давления и центробежной.",
  badge: "Динамика",
  formula: String.raw`v = -\omega r + \sqrt{(\omega r)^2 + \frac{r}{\rho}\frac{\partial p}{\partial r}}`,
};
