import type { Calculator } from "@/types/calculator";

export const coriolisCalculator: Calculator = {
  slug: "coriolis",
  title: "Параметр Кориолиса",
  description:
    "Расчёт параметра Кориолиса l = 2ω sin φ и периода инерционных колебаний.",
  badge: "Динамика",
  formula: String.raw`l = 2\omega \sin \varphi`,
};
