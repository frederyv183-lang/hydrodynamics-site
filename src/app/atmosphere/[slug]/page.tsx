import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Formula from "@/components/ui/Formula";
import { atmosphereEntries } from "@/data/atmosphere";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return atmosphereEntries.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Params) {
  const e = atmosphereEntries.find((x) => x.slug === params.slug);
  return { title: e ? `${e.title} — Гидродинамика` : "Атмосфера и океан" };
}

export default function AtmosphereEntryPage({ params }: Params) {
  const e = atmosphereEntries.find((x) => x.slug === params.slug);
  if (!e) notFound();

  return (
    <article className="max-w-3xl">
      <Breadcrumbs
        items={[
          { href: "/", label: "Главная" },
          { href: "/atmosphere", label: "Атмосфера и океан" },
          { label: e.title }
        ]}
      />
      <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
        {e.category}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-brand-900">{e.title}</h1>
      <p className="mt-3 text-slate-600">{e.short}</p>

      <div className="formula-block mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-xl">
        <Formula latex={e.latex} display />
      </div>

      {e.about ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Описание</h2>
          <p className="mt-2 text-slate-600">{e.about}</p>
        </section>
      ) : null}

      {e.variables?.length ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">Обозначения</h2>
          <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {e.variables.map((v) => (
              <li key={v.symbol} className="flex items-center gap-4 px-4 py-3">
                <span className="min-w-[3rem] text-center text-lg">
                  <Formula latex={v.symbol} />
                </span>
                <span className="text-sm text-slate-700">{v.meaning}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
