import { MapScaleCalculator } from "@/components/calculators/MapScaleCalculator";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";

export default function Page() {
  return (
    <CalculatorLayout
      title="Масштабный множитель карты"
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: "Масштабный множитель карты" },
      ]}
      formula={String.raw`m = \frac{dl}{dl_s}`}
    >
      <MapScaleCalculator />
    </CalculatorLayout>
  );
}
