"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SpectrumPoint = {
  r: number;
  st: number;
  cu: number;
  cb: number;
};

// Гамма-распределение: n(r) = a * r^alpha * exp(-b*r)
// Нормируем так, чтобы максимум каждой кривой был равен 1 (для наглядности).
// r_m = alpha / b — модальный радиус.
function gammaShape(r: number, alpha: number, rMode: number): number {
  if (r <= 0) return 0;
  const b = alpha / rMode;
  const norm = Math.pow(rMode, alpha) * Math.exp(-alpha);
  return (Math.pow(r, alpha) * Math.exp(-b * r)) / norm;
}

const data: SpectrumPoint[] = [];
for (let r = 0.5; r <= 30; r += 0.5) {
  data.push({
    r,
    st: gammaShape(r, 2, 5),
    cu: gammaShape(r, 4, 10),
    cb: gammaShape(r, 6, 18),
  });
}

export default function CloudSpectrumChart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="r"
            type="number"
            domain={[0, 30]}
            tickCount={7}
            label={{ value: "Радиус капли r, мкм", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            domain={[0, 1.05]}
            label={{ value: "n(r), отн. ед.", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                st: "St (слоистые)",
                cu: "Cu (кучевые)",
                cb: "Cb (кучево-дождевые)",
              };
              return [value.toFixed(3), labels[name] ?? name];
            }}
            labelFormatter={(r: number) => `r = ${r} мкм`}
          />
          <Legend
            formatter={(value: string) => {
              const labels: Record<string, string> = {
                st: "St (слоистые), r_m = 5 мкм",
                cu: "Cu (кучевые), r_m = 10 мкм",
                cb: "Cb (кучево-дождевые), r_m = 18 мкм",
              };
              return labels[value] ?? value;
            }}
          />
          <Line type="monotone" dataKey="st" stroke="#38bdf8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="cu" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="cb" stroke="#ef4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}