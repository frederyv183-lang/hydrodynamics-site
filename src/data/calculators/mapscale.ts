import type { Calculator } from "@/types/calculator";

export const mapScaleCalculator: Calculator = {
  slug: "mapscale",
  title: "Масштабный множитель карты",
  description:
    "Расчёт масштабного множителя m для стереографической, конической и цилиндрической проекций.",
  badge: "Карты",
  formula: String.raw`m = \frac{dl}{dl_s}`,
};
