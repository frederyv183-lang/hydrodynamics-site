import type { Calculator } from "@/types/calculator";

export const bruntVaisalaCalculator: Calculator = {
  slug: "brunt-vaisala",
  title: "Частота Брента-Вяйсяля",
  description:
    "Частота плавучих колебаний в устойчиво стратифицированной среде: N = √((g/θ)·∂θ/∂z). Определяет период внутренних гравитационных волн.",
  badge: "Термодинамика",
  formula: String.raw`N = \sqrt{\frac{g}{\theta}\frac{\partial\theta}{\partial z}}`,
};
