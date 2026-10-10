import Link from "next/link";
import type { ReactNode } from "react";
import Formula from "@/components/ui/Formula";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  breadcrumbs: Crumb[];
  formula?: string;
  children: ReactNode;
};

export function CalculatorLayout({
  title,
  breadcrumbs,
  formula,
  children,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-4 text-sm text-slate-500">
        {breadcrumbs.map((c, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-2">/</span>}
            {c.href ? (
              <Link
                href={c.href}
                className="hover:text-brand-900 transition-colors"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-slate-700">{c.label}</span>
            )}
          </span>
        ))}
      </nav>

      <h1 className="text-3xl font-bold text-brand-900">{title}</h1>

      {formula && (
        <div className="formula-block mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white px-6 py-6 text-center text-xl">
          <Formula latex={formula} display />
        </div>
      )}

      <div className="mt-8">{children}</div>
    </div>
  );
}