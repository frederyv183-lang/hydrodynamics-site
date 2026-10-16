import type { Calculator } from "@/types/calculator";

export const aircraftCeilingCalculator: Calculator = {
  slug: "aircraft-ceiling",
  title: "Потолок самолёта",
  description:
    "Фактический потолок самолёта: H_пот,ф = H_пот,са − (760 − p₀)·10 − (T_трп,ф − T_трп,са)·80. Учитывает отличие давления и температуры от стандартной атмосферы.",
  badge: "Авиация",
  formula: String.raw`H_{\text{пот,ф}} = H_{\text{пот,са}} - (760 - p_0)\cdot 10 - (T_{\text{трп,ф}} - T_{\text{трп,са}})\cdot 80`,
};
