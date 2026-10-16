import type { Calculator } from "@/types/calculator";

export const geopotentialCalculator: Calculator = {
  slug: "geopotential",
  title: "Геопотенциал",
  description:
    "Геопотенциал Φ = ∫g·dz — потенциальная энергия единицы массы в поле силы тяжести. Показывает работу против силы тяжести при подъёме на высоту z.",
  badge: "Статика",
  formula: String.raw`\Phi = \int_0^z g\,dz`,
};
