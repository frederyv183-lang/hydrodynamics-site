import type { Calculator } from "@/types/calculator";

export const absoluteGeopotentialCalculator: Calculator = {
  slug: "absolute-geopotential",
  title: "Абсолютный геопотенциал",
  description:
    "Абсолютный геопотенциал H_p = (R/9.8)·∫T·d ln p от уровня моря до изобарической поверхности p. Используется для построения карт барической топографии.",
  badge: "Статика",
  formula: String.raw`H_p = \frac{R}{9.8}\int_{p_0}^{p} T\,d\ln p`,
};
