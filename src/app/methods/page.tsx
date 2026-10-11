import type { Metadata } from "next";
import { methods } from "@/data/methods";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "\u0427\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u0435 \u043c\u0435\u0442\u043e\u0434\u044b | \u0413\u0438\u0434\u0440\u043e\u0434\u0438\u043d\u0430\u043c\u0438\u043a\u0430",
  description: "\u0421\u043f\u0440\u0430\u0432\u043e\u0447\u043d\u0438\u043a \u043f\u043e \u0447\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u043c \u043c\u0435\u0442\u043e\u0434\u0430\u043c."
};

export default function MethodsPage() {
  const byCategory = methods.reduce<Record<string, typeof methods>>(
    (acc, method) => {
      if (!acc[method.category]) acc[method.category] = [];
      acc[method.category].push(method);
      return acc;
    },
    {}
  );
  Object.values(byCategory).forEach((arr) => arr.sort((a, b) => a.order - b.order));
  const sortedCategories = Object.keys(byCategory).sort((a, b) => {
    const minA = Math.min(...byCategory[a].map((m) => m.order));
    const minB = Math.min(...byCategory[b].map((m) => m.order));
    return minA - minB;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-3">{"\u0427\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u0435 \u043c\u0435\u0442\u043e\u0434\u044b"}</h1>
        <p className="text-lg text-muted-foreground">
          {"\u0421\u043f\u0440\u0430\u0432\u043e\u0447\u043d\u0438\u043a \u043f\u043e \u0447\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u043c \u043c\u0435\u0442\u043e\u0434\u0430\u043c \u043c\u043e\u0434\u0435\u043b\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0430\u0442\u043c\u043e\u0441\u0444\u0435\u0440\u043d\u044b\u0445 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0432."}
        </p>
      </header>

      {sortedCategories.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {byCategory[category].map((method) => (
              <Card
                key={method.slug}
                href={`/methods/${method.slug}`}
                title={method.title}
                description={method.short}
                badge={method.convergence?.order}
              />
            ))}
          </div>
        </section>
      ))}

      {methods.length === 0 && (
        <p className="text-muted-foreground">
          {"\u041c\u0435\u0442\u043e\u0434\u044b \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b."}
        </p>
      )}
    </div>
  );
}