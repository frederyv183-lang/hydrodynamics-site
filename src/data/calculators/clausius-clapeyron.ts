import type { Calculator } from "@/types/calculator";

export const clausiusClapeyronCalculator: Calculator = {
  slug: "clausius-clapeyron",
  title: "Уравнение Клаузиуса-Клапейрона",
  description:
    "Зависимость упругости насыщения от температуры: (1/E)·dE/dT = L/(R_n·T²). Расчёт упругости насыщения над водой и льдом.",
  badge: "Термодинамика",
  formula: String.raw`\frac{1}{E}\frac{dE}{dT} = \frac{L}{R_n T^2}`,
};
