import type { Calculator } from "@/types/calculator";

export const takeoffSpeedCalculator: Calculator = {
  slug: "takeoff-speed",
  title: "Скорость отрыва самолёта",
  description:
    "Расчёт скорости отрыва по формуле V = √(2G/(c_y·S·ρ)). Учитывает массу, площадь крыла, коэффициент подъёмной силы и плотность воздуха (напрямую или из T и p).",
  badge: "Авиация",
  formula: String.raw`V_{\text{отр}} = \sqrt{\frac{2G}{c_y S \rho}}`,
};
