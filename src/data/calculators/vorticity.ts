import type { Calculator } from "@/types/calculator";

export const vorticityCalculator: Calculator = {
  slug: "vorticity",
  title: "Уравнение вихря",
  description:
    "Изменение абсолютного вихря: d(ζ+f)/dt = −(ζ+f)·D. Показывает, как дивергенция D влияет на вращение воздуха и сохранение потенциального вихря.",
  badge: "Динамика",
  formula: String.raw`\frac{d(\zeta + f)}{dt} = -(\zeta + f) D`,
};
