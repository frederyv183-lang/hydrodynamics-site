"use client";

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";

const kappa = 0.4;
const uStar = 0.3;

type Point = { u: number; z: number };

function buildProfile(z0: number, zs: number[]): Point[] {
  return zs
    .filter((z) => z > z0) // отбрасываем точки ниже шероховатости
    .map((z) => ({
      z,
      u: (uStar / kappa) * Math.log(z / z0)
    }));
}

const zs = [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100];

const grass = buildProfile(0.03, zs);
const forest = buildProfile(1.0, zs);
const city = buildProfile(2.0, zs);

export default function BoundaryLayerChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          type="number"
          dataKey="u"
          name="Скорость u"
          unit=" м/с"
          domain={[0, 12]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Скорость ветра u, м/с",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          type="number"
          dataKey="z"
          name="Высота z"
          unit=" м"
          scale="log"
          domain={[0.03, 100]}
          ticks={[0.03, 0.1, 0.3, 1, 3, 10, 30, 100]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Высота z, м (лог. шкала)",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <ZAxis range={[60, 60]} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value, name) => {
            if (name === "Скорость u") return [`${Number(value).toFixed(2)} м/с`, "u"];
            if (name === "Высота z") return [`${value} м`, "z"];
            return [value, name];
          }}
          labelFormatter={() => ""}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Scatter
          name="Трава (z0 = 0.03 м)"
          data={grass}
          fill="#10b981"
          isAnimationActive={false}
        />
        <Scatter
          name="Лес (z0 = 1 м)"
          data={forest}
          fill="#f59e0b"
          isAnimationActive={false}
        />
        <Scatter
          name="Город (z0 = 2 м)"
          data={city}
          fill="#ef4444"
          isAnimationActive={false}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}