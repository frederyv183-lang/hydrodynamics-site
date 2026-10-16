import type { Calculator } from "@/types/calculator";

export const stefanBoltzmannCalculator: Calculator = {
  slug: "stefan-boltzmann",
  title: "Закон Стефана-Больцмана",
  description:
    "Полный поток излучения абсолютно чёрного тела: B = σT⁴. Расчёт для Солнца, Земли и стратосферы. Показывает, как сильно растёт излучение с температурой.",
  badge: "Радиация",
  formula: String.raw`B = \sigma T^4`,
};
