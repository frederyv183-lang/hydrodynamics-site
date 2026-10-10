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
  YAxis,
} from "recharts";

type Point = {
  lat: number;
  pas: number;   // пассаты (приземный ветер)
  west: number;  // западный перенос (приземный ветер)
  pol: number;   // полярные восточные (приземный ветер)
};

// Задание профилей зональной скорости u(lat) по широте (в градусах).
// Знаки: u > 0 — западный (на восток), u < 0 — восточный (на запад).
// Формула — комбинация гауссиан и косинуса для наглядности.

function gauss(x: number, mu: number, sigma: number): number {
  const d = x - mu;
  return Math.exp(-(d * d) / (sigma * sigma));
}

// Приземный профиль: пассаты (E, до −7), западный перенос (W, до +8),
// полярные восточные (E, до −3).
function pasProfile(lat: number): number {
  return -7 * gauss(lat, 0, 20) * (1 - 0.3 * gauss(lat, 90, 30));
}
function westProfile(lat: number): number {
  return 8 * gauss(lat, 45, 18) + 8 * gauss(lat, -45, 18);
}
function polProfile(lat: number): number {
  return -3 * (gauss(lat, 75, 12) + gauss(lat, -75, 12));
}

const data: Point[] = [];
for (let lat = -90; lat <= 90; lat += 2) {
  data.push({
    lat,
    pas: pasProfile(lat),
    west: westProfile(lat),
    pol: polProfile(lat),
  });
}

export default function CirculationChart() {
  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="lat"
            type="number"
            domain={[-90, 90]}
            ticks={[-90, -60, -30, 0, 30, 60, 90]}
            label={{ value: "Широта, °", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            domain={[-15, 15]}
            label={{ value: "Зональная скорость u, м/с", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                pas: "Пассаты (E)",
                west: "Западный перенос (W)",
                pol: "Полярные восточные (E)",
              };
              return [`${value.toFixed(2)} м/с`, labels[name] ?? name];
            }}
            labelFormatter={(lat: number) => `Широта ${lat}°`}
          />
          <Legend
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                pas: "Пассаты (восточные, 0–30°)",
                west: "Западный перенос (30–60°)",
                pol: "Полярные восточные (60–90°)",
              };
              return labels[value] ?? value;
            }}
          />
          <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="2 2" />
          <ReferenceLine x={-30} stroke="#cbd5e1" strokeDasharray="2 2" label={{ value: "30°S", position: "top", fontSize: 10 }} />
          <ReferenceLine x={30} stroke="#cbd5e1" strokeDasharray="2 2" label={{ value: "30°N", position: "top", fontSize: 10 }} />
          <ReferenceLine x={-60} stroke="#cbd5e1" strokeDasharray="2 2" label={{ value: "60°S", position: "top", fontSize: 10 }} />
          <ReferenceLine x={60} stroke="#cbd5e1" strokeDasharray="2 2" label={{ value: "60°N", position: "top", fontSize: 10 }} />
          <Line type="monotone" dataKey="pas" stroke="#38bdf8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="west" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="pol" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}