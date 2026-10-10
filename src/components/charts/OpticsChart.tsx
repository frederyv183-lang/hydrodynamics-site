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

// Угол главной радуги (1 внутреннее отражение): cos θ = (n² − 1) / (n² + 1)
function primaryAngleDeg(n: number): number {
  const cosT = (n * n - 1) / (n * n + 1);
  return (Math.acos(cosT) * 180) / Math.PI;
}

// Угол вторичной радуги (2 внутренних отражения): cos θ = √((9 − n²) / 8)
function secondaryAngleDeg(n: number): number {
  const arg = (9 - n * n) / 8;
  if (arg < 0) return NaN;
  return (Math.acos(Math.sqrt(arg)) * 180) / Math.PI;
}

type Row = {
  n: number;
  primary: number;
  secondary: number;
};

const ns = [1.30, 1.31, 1.32, 1.33, 1.34, 1.35, 1.36, 1.37, 1.38, 1.39, 1.40];
const data: Row[] = ns.map((n) => ({
  n,
  primary: Number(primaryAngleDeg(n).toFixed(2)),
  secondary: Number(secondaryAngleDeg(n).toFixed(2))
}));

export default function OpticsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="n"
          type="number"
          domain={[1.30, 1.40]}
          ticks={[1.30, 1.32, 1.34, 1.36, 1.38, 1.40]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Показатель преломления n",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          type="number"
          domain={[30, 60]}
          ticks={[30, 35, 40, 45, 50, 55, 60]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Угол θ, °",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value: number, name: string) => {
            if (name === "primary") return [`${value}°`, "Главная радуга"];
            if (name === "secondary") return [`${value}°`, "Вторичная радуга"];
            return [value, name];
          }}
          labelFormatter={(label) => `n = ${label}`}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value) =>
            value === "primary" ? "Главная радуга (1 отражение)"
            : value === "secondary" ? "Вторичная радуга (2 отражения)"
            : value
          }
        />
        <Line
          type="monotone"
          dataKey="primary"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={{ r: 3 }}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="secondary"
          stroke="#a855f7"
          strokeWidth={2}
          strokeDasharray="6 4"
          dot={{ r: 3 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}