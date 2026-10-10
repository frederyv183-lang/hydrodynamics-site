import Card from "@/components/ui/Card";
import { models } from "@/data/models";

export const metadata = {
  title: "Модели — Гидродинамика"
};

export default function ModelsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Модели</h1>
      <p className="mt-2 text-slate-600">
        Математические модели, используемые в гидродинамике.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((m) => (
          <Card
            key={m.slug}
            href={`/models/${m.slug}`}
            title={m.title}
            description={m.short}
            badge={m.category}
          />
        ))}
      </div>
    </div>
  );
}
