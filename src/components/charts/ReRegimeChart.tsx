"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = Array.from({ length: 101 }, (_, i) => {
  const Re = i * 50; // 0..5000
  let regime = 1; // переходный
  if (Re < 2300) regime = 0; // ламинарный
  else if (Re > 4000) regime = 2; // турбулентный
  return { Re, regime };
});

export default function ReRegimeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <defs>
          <linearGradient id="regimeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b96f6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#3b96f6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="Re"
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Re",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          domain={[0, 2]}
          ticks={[0, 1, 2]}
          tickFormatter={(v: number) =>
            v === 0 ? "лам." : v === 1 ? "перех." : "турб."
          }
          tick={{ fontSize: 12, fill: "#475569" }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          labelFormatter={(v) => `Re = ${v}`}
          formatter={(value: number) => {
            const labels = ["ламинарный", "переходный", "турбулентный"];
            return [labels[value] ?? "—", "Режим"];
          }}
        />
        <ReferenceLine
          x={2300}
          stroke="#94a3b8"
          strokeDasharray="4 4"
          label={{ value: "2300", fontSize: 11, fill: "#64748b" }}
        />
        <ReferenceLine
          x={4000}
          stroke="#94a3b8"
          strokeDasharray="4 4"
          label={{ value: "4000", fontSize: 11, fill: "#64748b" }}
        />
        <Area
          type="stepAfter"
          dataKey="regime"
          stroke="#1d61d8"
          strokeWidth={2}
          fill="url(#regimeFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
