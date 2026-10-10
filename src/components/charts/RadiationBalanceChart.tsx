"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Радиационный баланс системы Земля-атмосфера по широтным зонам
// (годовые значения по М. И. Будыко и Н. А. Багрову, ккал/(см²·год))
const data = [
  { lat: -90, RS: -73, RS_surface: -3 },
  { lat: -80, RS: -70, RS_surface: -3 },
  { lat: -70, RS: -73, RS_surface: -1 },
  { lat: -60, RS: -76, RS_surface: 1 },
  { lat: -50, RS: -69, RS_surface: 4 },
  { lat: -40, RS: -59, RS_surface: 8 },
  { lat: -30, RS: -50, RS_surface: 16 },
  { lat: -20, RS: -54, RS_surface: 27 },
  { lat: -10, RS: -56, RS_surface: 40 },
  { lat: 0, RS: -60, RS_surface: 50 },
  { lat: 10, RS: -56, RS_surface: 48 },
  { lat: 20, RS: -54, RS_surface: 40 },
  { lat: 30, RS: -50, RS_surface: 30 },
  { lat: 40, RS: -59, RS_surface: 18 },
  { lat: 50, RS: -69, RS_surface: 5 },
  { lat: 60, RS: -76, RS_surface: -3 },
  { lat: 70, RS: -73, RS_surface: -3 },
  { lat: 80, RS: -70, RS_surface: -1 },
  { lat: 90, RS: -73, RS_surface: 0 }
];

export default function RadiationBalanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="lat"
          type="number"
          domain={[-90, 90]}
          ticks={[-90, -60, -30, 0, 30, 60, 90]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Широта, град",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "ккал/(см²·год)",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          labelFormatter={(v) => `φ = ${v}°`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <ReferenceLine y={0} stroke="#64748b" />
        <ReferenceLine x={0} stroke="#cbd5e1" />
        <Line
          type="monotone"
          dataKey="RS_surface"
          name="Радиационный баланс поверхности"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 3 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="RS"
          name="Радиационный баланс системы Земля-атмосфера"
          stroke="#1d61d8"
          strokeWidth={2}
          dot={{ r: 3 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
