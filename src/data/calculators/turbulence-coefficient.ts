import type { Calculator } from "@/types/calculator";

export const turbulenceCoefficientCalculator: Calculator = {
  slug: "turbulence-coefficient",
  title: "Коэффициент турбулентности",
  description:
    "Расчёт коэффициента турбулентности K = k·v*·z и динамической скорости v* = √(τ/ρ). Показывает распределение турбулентного обмена по высоте в пограничном слое.",
  badge: "Турбулентность",
  formula: String.raw`K = k \cdot v_* \cdot z, \quad v_* = \sqrt{\tau/\rho}`,
};
