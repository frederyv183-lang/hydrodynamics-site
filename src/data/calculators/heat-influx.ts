import type { Calculator } from "@/types/calculator";

export const heatInfluxCalculator: Calculator = {
  slug: "heat-influx",
  title: "Уравнение притока тепла",
  description:
    "Первое начало термодинамики для влажного воздуха: dQ = c_p·dT − RT·dp/p + L·ds_m. Расчёт изменения тепла при заданных dT, dp и изменении влажности.",
  badge: "Термодинамика",
  formula: String.raw`dQ = c_p\,dT - RT\,\frac{dp}{p} + L\,ds_m`,
};
