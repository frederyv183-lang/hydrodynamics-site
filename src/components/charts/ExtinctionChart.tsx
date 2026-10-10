"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Закон Буге: F/F₀ = p^m, где m = 1/sin h_c
// Строим зависимость относительного потока от высоты Солнца
// при разных коэффициентах прозрачности p

const heights = Array.from({ length: 46 }, (_, i) => i * 2); // 0..90° с шагом 2

function sinDeg(deg: number): number {
  return Math.sin((deg * Math.PI) / 180);
}

const data = heights.map((h) => {
  const m = h > 0 ? 1 / sinDeg(h) : 40; // при h=0 берём m≈40
  const p1 = 0.5;
  const p2 = 0.7;
  const p3 = 0.85;

  return {
    h,
    m: Number(m.toFixed(2)),
    p50: Number(Math.pow(p1, m).toFixed(4)),
    p70: Number(Math.pow(p2, m).toFixed(4)),
    p85: Number(Math.pow(p3, m).toFixed(4))
  };
});

export default function ExtinctionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="h"
          type="number"
          domain={[0, 90]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "h_c, град",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          domain={[0, 1]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "F/F₀",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value: number) => value.toFixed(4)}
          labelFormatter={(v) => `h_c = ${v}°`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="p50"
          name="p = 0.5 (мутная)"
          stroke="#dc2626"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="p70"
          name="p = 0.7 (средняя)"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="p85"
          name="p = 0.85 (прозрачная)"
          stroke="#10b981"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
