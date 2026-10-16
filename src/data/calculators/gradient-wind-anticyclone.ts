import type { Calculator } from "@/types/calculator";

export const gradientWindAnticycloneCalculator: Calculator = {
  slug: "gradient-wind-anticyclone",
  title: "Градиентный ветер (антициклон)",
  description:
    "Скорость градиентного ветра в круговом антициклоне: v = ωr − √((ωr)² − (r/ρ)·∂p/∂r). Учитывает предел устойчивости антициклона.",
  badge: "Динамика",
  formula: String.raw`v = \omega r - \sqrt{(\omega r)^2 - \frac{r}{\rho}\frac{\partial p}{\partial r}}`,
};
