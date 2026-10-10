import { CoriolisCalculator } from "@/components/calculators/CoriolisCalculator";
import { CalculatorLayout } from "@/components/calculators/CalculatorLayout";

export default function Page() {
  return (
    <CalculatorLayout
      title="Параметр Кориолиса"
      breadcrumbs={[
        { label: "Главная", href: "/" },
        { label: "Калькуляторы", href: "/calculators" },
        { label: "Параметр Кориолиса" },
      ]}
      formula={String.raw`l = 2\omega \sin \varphi`}
    >
      <CoriolisCalculator />
    </CalculatorLayout>
  );
}
