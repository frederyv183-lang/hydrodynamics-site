import { SigmaCalculator } from "@/components/calculators/SigmaCalculator";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";

export default function Page() {
  return (
    <CalculatorLayout
      title="Приведённое давление σ"
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: "Приведённое давление σ" },
      ]}
      formula={String.raw`\sigma = \frac{p}{p_s}`}
    >
      <SigmaCalculator />
    </CalculatorLayout>
  );
}
