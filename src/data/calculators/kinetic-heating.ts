import type { Calculator } from "@/types/calculator";

export const kineticHeatingCalculator: Calculator = {
  slug: "kinetic-heating",
  title: "Кинетический нагрев",
  description:
    "Кинетический нагрев обшивки: ΔT = V²/2000 = 5·(V/100)². Показывает, на сколько градусов нагревается поверхность самолёта при полёте на заданной скорости.",
  badge: "Авиация",
  formula: String.raw`\Delta T = \frac{V^2}{2000} = 5 \left(\frac{V}{100}\right)^2`,
};
