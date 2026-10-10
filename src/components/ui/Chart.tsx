"use client";

import type { ReactNode } from "react";

type ChartProps = {
  title: string;
  description?: string;
  height?: number;
  children: ReactNode;
};

export default function Chart({
  title,
  description,
  height = 300,
  children
}: ChartProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      ) : null}
      <div className="mt-4" style={{ width: "100%", height }}>
        {children}
      </div>
    </div>
  );
}
