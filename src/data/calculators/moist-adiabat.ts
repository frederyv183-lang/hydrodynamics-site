import type { Calculator } from "@/types/calculator";

export const moistAdiabatCalculator: Calculator = {
  slug: "moist-adiabat",
  title: "Влажноадиабатический градиент",
  description:
    "Расчёт влажноадиабатического градиента температуры γ′ = γ_a + (L/c_p)·(ds/dz). Показывает, как насыщенный воздух охлаждается при подъёме медленнее сухого.",
  badge: "Термодинамика",
  formula: String.raw`\gamma' = \gamma_a + \frac{L}{c_p}\,\frac{ds_m}{dz}`,
};
