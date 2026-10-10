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

const k = 0.4;      // константа Кармана
const uStar = 0.3;  // динамическая скорость, м/с
const L = 50;       // масштаб Монина-Обухова, м (|L| = 50)

// Коэффициент турбулентности, м²/с
function kNeutral(z: number): number {
  return k * uStar * z;
}
function kUnstable(z: number): number {
  // L = -50: K = k·u*·z·(1 - 15·z/L) = k·u*·z·(1 + 15·z/50)
  return k * uStar * z * (1 + 15 * z / 50);
}
function kStable(z: number): number {
  // L = +50: K = k·u*·z / (1 + 5·z/L) = k·u*·z / (1 + z/10)
  return (k * uStar * z) / (1 + z / 10);
}

type Row = {
  z: number;
  unstable: number;
  neutral: number;
  stable: number;
};

const zs = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100];
const data: Row[] = zs.map((z) => ({
  z,
  unstable: Number(kUnstable(z).toFixed(3)),
  neutral: Number(kNeutral(z).toFixed(3)),
  stable: Number(kStable(z).toFixed(3))
}));

export default function TurbulenceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="neutral"
          type="number"
          name="K"
          unit=" м²/с"
          domain={[0, 30]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "K, м²/с",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          dataKey="z"
          type="number"
          name="z"
          unit=" м"
          scale="log"
          domain={[0.1, 100]}
          ticks={[0.1, 0.3, 1, 3, 10, 30, 100]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Высота z, м (лог. шкала)",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value: number, name: string) => {
            if (name === "unstable") return [`${value} м²/с`, "Неустойчивая"];
            if (name === "neutral") return [`${value} м²/с`, "Нейтральная"];
            if (name === "stable") return [`${value} м²/с`, "Устойчивая"];
            return [value, name];
          }}
          labelFormatter={(label) => `z ≈ ${label} м`}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value) =>
            value === "unstable" ? "Неустойчивая (L = −50 м)"
            : value === "neutral" ? "Нейтральная"
            : value === "stable" ? "Устойчивая (L = +50 м)"
            : value
          }
        />
        <Line
          type="monotone"
          dataKey="unstable"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="neutral"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="stable"
          stroke="#6366f1"
          strokeWidth={2}
          strokeDasharray="6 4"
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}