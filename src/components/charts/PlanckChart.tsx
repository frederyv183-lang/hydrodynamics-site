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

// Закон Планка: B(λ,T) = c1 λ⁻⁵ / (exp(c2/(λT)) - 1)
// c1 = 3.7405e-5 эрг·см²/с, c2 = 1.43879 см·К
// Переведём в удобные единицы: λ в мкм, T в К
const c1 = 3.7405e-5;
const c2 = 1.43879;

function planck(lambda: number, T: number): number {
  const lam = lambda * 1e-4; // мкм → см
  const x = c2 / (lam * T);
  if (x > 700) return 0; // избегаем переполнения exp
  return (c1 * Math.pow(lam, -5)) / (Math.exp(x) - 1);
}

const lambdas = Array.from({ length: 200 }, (_, i) => 0.1 + i * 0.05);

const data = lambdas.map((lam) => ({
  lambda: Number(lam.toFixed(2)),
  T6000: Number((planck(lam, 6000) * 1e-8).toFixed(6)),  // Солнце
  T300: Number((planck(lam, 300) * 1e-8).toFixed(6)),    // Земля
  T200: Number((planck(lam, 200) * 1e-8).toFixed(6))     // стратосфера
}));

export default function PlanckChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="lambda"
          type="number"
          domain={[0, 10]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "λ, мкм",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "B(λ,T), отн. ед.",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value: number) => value.toFixed(4)}
          labelFormatter={(v) => `λ = ${v} мкм`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="T6000"
          name="T = 6000 К (Солнце)"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="T300"
          name="T = 300 К (Земля)"
          stroke="#3b96f6"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="T200"
          name="T = 200 К (стратосфера)"
          stroke="#1d61d8"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
