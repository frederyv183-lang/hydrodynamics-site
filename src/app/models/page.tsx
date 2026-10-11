import Card from "@/components/ui/Card";
import { models } from "@/data/models";

export const metadata = {
  title: "\u041c\u043e\u0434\u0435\u043b\u0438 \u2014 \u0413\u0438\u0434\u0440\u043e\u0434\u0438\u043d\u0430\u043c\u0438\u043a\u0430"
};

export default function ModelsPage() {
  const byCategory = models.reduce<Record<string, typeof models>>(
    (acc, model) => {
      if (!acc[model.category]) acc[model.category] = [];
      acc[model.category].push(model);
      return acc;
    },
    {}
  );
  Object.values(byCategory).forEach((arr) =>
    arr.sort((a, b) => a.order - b.order)
  );
  const sortedCategories = Object.keys(byCategory).sort((a, b) => {
    const minA = Math.min(...byCategory[a].map((m) => m.order));
    const minB = Math.min(...byCategory[b].map((m) => m.order));
    return minA - minB;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-3">
          {"\u041c\u043e\u0434\u0435\u043b\u0438"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {"\u041c\u0430\u0442\u0435\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043c\u043e\u0434\u0435\u043b\u0438, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0435 \u0432 \u0433\u0438\u0434\u0440\u043e\u0434\u0438\u043d\u0430\u043c\u0438\u043a\u0435 \u0438 \u0447\u0438\u0441\u043b\u0435\u043d\u043d\u043e\u043c \u043f\u0440\u043e\u0433\u043d\u043e\u0437\u0435 \u043f\u043e\u0433\u043e\u0434\u044b."}
        </p>
      </header>

      {sortedCategories.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {byCategory[category].map((model) => (
              <Card
                key={model.slug}
                href={`/models/${model.slug}`}
                title={model.title}
                description={model.short}
                badge={model.category}
              />
            ))}
          </div>
        </section>
      ))}

      {models.length === 0 && (
        <p className="text-muted-foreground">
          {"\u041c\u043e\u0434\u0435\u043b\u0438 \u043f\u043e\u043a\u0430 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b."}
        </p>
      )}
    </div>
  );
}