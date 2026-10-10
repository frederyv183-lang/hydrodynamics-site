"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Стандартная атмосфера (упрощённая)
// Тропосфера: 0-11 км, T = 15 - 6.5·z (°C), γ = 6.5 °C/км
// Тропопауза: 11 км, T = -56.5 °C
// Стратосфера: 11-20 км, T = const = -56.5 °C
// Стратосфера: 20-50 км, T растёт до 0 °C (озоновый слой)
// Мезосфера: 50-90 км, T падает до -90 °C
// Термосфера: 90+ км, T растёт
const data = [
  { z: 0, T: 15, layer: "Тропосфера" },
  { z: 2, T: 2, layer: "Тропосфера" },
  { z: 4, T: -11, layer: "Тропосфера" },
  { z: 6, T: -24, layer: "Тропосфера" },
  { z: 8, T: -37, layer: "Тропосфера" },
  { z: 10, T: -50, layer: "Тропосфера" },
  { z: 11, T: -56.5, layer: "Тропопауза" },
  { z: 13, T: -56.5, layer: "Стратосфера" },
  { z: 15, T: -56.5, layer: "Стратосфера" },
  { z: 17, T: -56.5, layer: "Стратосфера" },
  { z: 19, T: -56.5, layer: "Стратосфера" },
  { z: 20, T: -56.5, layer: "Стратосфера" },
  { z: 25, T: -50, layer: "Стратосфера" },
  { z: 30, T: -42, layer: "Стратосфера" },
  { z: 35, T: -32, layer: "Стратосфера" },
  { z: 40, T: -20, layer: "Стратосфера" },
  { z: 45, T: -8, layer: "Стратосфера" },
  { z: 50, T: 0, layer: "Стратопауза" },
  { z: 55, T: -10, layer: "Мезосфера" },
  { z: 60, T: -25, layer: "Мезосфера" },
  { z: 65, T: -40, layer: "Мезосфера" },
  { z: 70, T: -55, layer: "Мезосфера" },
  { z: 75, T: -68, layer: "Мезосфера" },
  { z: 80, T: -80, layer: "Мезосфера" },
  { z: 85, T: -88, layer: "Мезосфера" },
  { z: 90, T: -90, layer: "Мезопауза" },
  { z: 100, T: -70, layer: "Термосфера" },
  { z: 110, T: -30, layer: "Термосфера" },
  { z: 120, T: 30, layer: "Термосфера" }
];

export default function TemperatureProfileChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="T"
          type="number"
          domain={[-100, 50]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "T, °C",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          dataKey="z"
          type="number"
          domain={[0, 120]}
          reversed
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "z, км",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value: number, name) => {
            if (name === "T") return [`${value} °C`, "Температура"];
            return [value, name];
          }}
          labelFormatter={(label) => `T = ${label} °C`}
        />
        <ReferenceLine x={0} stroke="#cbd5e1" />
        <ReferenceLine y={11} stroke="#94a3b8" strokeDasharray="4 4" />
        <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" />
        <ReferenceLine y={90} stroke="#94a3b8" strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="T"
          stroke="#1d61d8"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
