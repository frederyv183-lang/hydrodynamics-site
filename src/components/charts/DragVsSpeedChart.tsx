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

const rho = 1000; // вода
const A = 0.01; // 100 см²

const data = Array.from({ length: 21 }, (_, i) => {
  const v = i * 0.5; // 0..10 м/с
  return {
    v: Number(v.toFixed(2)),
    sphere: 0.47,
    cylinder: 1.2,
    streamlined: 0.04,
    Fsphere: Number((0.5 * 0.47 * rho * v * v * A).toFixed(2)),
    Fcyl: Number((0.5 * 1.2 * rho * v * v * A).toFixed(2)),
    Fstream: Number((0.5 * 0.04 * rho * v * v * A).toFixed(2))
  };
});

export default function DragVsSpeedChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="v"
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "v, м/с",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "F_d, Н",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value: number) => value.toFixed(2)}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="Fstream"
          name="Капля (C_d = 0.04)"
          stroke="#3b96f6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Fsphere"
          name="Сфера (C_d = 0.47)"
          stroke="#1d61d8"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Fcyl"
          name="Цилиндр (C_d = 1.2)"
          stroke="#162b55"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
