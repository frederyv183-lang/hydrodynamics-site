import type { Calculator } from "@/types/calculator";

export const relativeGeopotentialCalculator: Calculator = {
  slug: "relative-geopotential",
  title: "Относительный геопотенциал",
  description:
    "Относительный геопотенциал H_{p1}^{p2} = (R/9.8)·∫T·d ln p между двумя изобарическими поверхностями. Толщина слоя, используется для термического анализа.",
  badge: "Статика",
  formula: String.raw`H_{p_1}^{p_2} = \frac{R}{9.8}\int_{p_2}^{p_1} T\,d\ln p`,
};
