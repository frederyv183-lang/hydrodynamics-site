import Card from "@/components/ui/Card";
import { calculators } from "@/data/calculatorsList";

export const metadata = {
  title: "Калькуляторы — Гидродинамика"
};

export default function CalculatorsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Калькуляторы</h1>
      <p className="mt-2 text-slate-600">
        Интерактивные расчёты гидродинамических величин.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((c) => (
          <Card
            key={c.slug}
            href={`/calculators/${c.slug}`}
            title={c.title}
            description={c.description}
            badge={c.badge}
          />
        ))}
      </div>
    </div>
  );
}