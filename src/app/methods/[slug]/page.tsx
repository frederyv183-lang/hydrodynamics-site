import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { methods } from "@/data/methods";
import Formula from "@/components/ui/Formula";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return methods.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const method = methods.find((m) => m.slug === params.slug);
  if (!method) {
    return { title: "\u041c\u0435\u0442\u043e\u0434 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d" };
  }
  return {
    title: `${method.title} | \u0427\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u0435 \u043c\u0435\u0442\u043e\u0434\u044b`,
    description: method.short,
  };
}

export default function MethodPage({ params }: { params: Params }) {
  const method = methods.find((m) => m.slug === params.slug);
  if (!method) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "\u0413\u043b\u0430\u0432\u043d\u0430\u044f", href: "/" },
          { label: "\u041c\u0435\u0442\u043e\u0434\u044b", href: "/methods" },
          { label: method.title },
        ]}
      />

      <header className="mb-8 mt-4">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-2 py-1 text-xs font-medium rounded bg-secondary text-secondary-foreground">
            {method.category}
          </span>
          {method.convergence?.order && (
            <span className="px-2 py-1 text-xs font-mono rounded bg-primary/10 text-primary">
              {method.convergence.order}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold mb-3">{method.title}</h1>
        <p className="text-lg text-muted-foreground">{method.short}</p>
      </header>

      {method.about && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}</h2>
          <p className="text-base leading-relaxed">{method.about}</p>
        </section>
      )}

      {method.algorithm && method.algorithm.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{"\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c"}</h2>
          <ol className="list-decimal list-inside space-y-2 text-base">
            {method.algorithm.map((step, i) => (
              <li key={i} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </section>
      )}

      {method.formulas && method.formulas.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{"\u0424\u043e\u0440\u043c\u0443\u043b\u044b"}</h2>
          <div className="space-y-4">
            {method.formulas.map((formula, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-3">{formula.title}</h3>
                <div className="my-4 overflow-x-auto">
                  <Formula latex={formula.latex} display={true} />
                </div>
                {formula.about && (
                  <p className="text-sm text-muted-foreground mb-3">{formula.about}</p>
                )}
                {formula.variables && formula.variables.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">{"\u041e\u0431\u043e\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f:"}</p>
                    <ul className="text-sm space-y-1">
                      {formula.variables.map((v, j) => (
                        <li key={j}>
                          <span className="font-mono font-medium"><Formula latex={v.symbol} /></span>
                          {" \u2014 "}
                          <span className="text-muted-foreground">{v.meaning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {method.convergence && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{"\u041e\u0446\u0435\u043d\u043a\u0430 \u0442\u043e\u0447\u043d\u043e\u0441\u0442\u0438"}</h2>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div>
              <span className="text-sm font-medium">{"\u041f\u043e\u0440\u044f\u0434\u043e\u043a \u0442\u043e\u0447\u043d\u043e\u0441\u0442\u0438: "}</span>
              <span className="font-mono">{method.convergence.order}</span>
            </div>
            {method.convergence.stability && (
              <div>
                <span className="text-sm font-medium">{"\u0423\u0441\u0442\u043e\u0439\u0447\u0438\u0432\u043e\u0441\u0442\u044c: "}</span>
                <span className="text-muted-foreground">{method.convergence.stability}</span>
              </div>
            )}
            {method.convergence.error && (
              <div>
                <span className="text-sm font-medium">{"\u041e\u0448\u0438\u0431\u043a\u0430: "}</span>
                <span className="text-muted-foreground">{method.convergence.error}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {method.applications && method.applications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{"\u041f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u0435"}</h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            {method.applications.map((app, i) => (
              <li key={i} className="leading-relaxed">{app}</li>
            ))}
          </ul>
        </section>
      )}

      {method.source && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">{"\u041b\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430"}</h2>
          <p className="text-sm text-muted-foreground italic">{method.source}</p>
        </section>
      )}

      <div className="mt-10 pt-6 border-t border-border">
        <Link href="/methods" className="text-sm text-primary hover:underline">
          {"\u2190 \u041d\u0430\u0437\u0430\u0434 \u043a \u0441\u043f\u0438\u0441\u043a\u0443 \u043c\u0435\u0442\u043e\u0434\u043e\u0432"}
        </Link>
      </div>
    </div>
  );
}