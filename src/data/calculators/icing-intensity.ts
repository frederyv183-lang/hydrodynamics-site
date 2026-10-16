import type { Calculator } from "@/types/calculator";

export const icingIntensityCalculator: Calculator = {
  slug: "icing-intensity",
  title: "Интенсивность обледенения",
  description:
    "Расчёт скорости нарастания льда на обшивке самолёта: I = (V·w/ρ_л)·(Δy/Δl). Учитывает водность облака, скорость полёта и коэффициент захвата.",
  badge: "Авиация",
  formula: String.raw`I = \frac{V \cdot w}{\rho_\text{л}} \cdot \frac{\Delta y}{\Delta l}`,
};
