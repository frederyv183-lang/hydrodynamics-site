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

type Props = {
  rho: number;
  A: number;
  Cd: number;
  vMax?: number;
  vCurrent?: number;
};

export default function LiveDragChart({
  rho,
  A,
  Cd,
  vMax = 15,
  vCurrent
}: Props) {
  const N = 120;
  const data = Array.from({ length: N + 1 }, (_, i) => {
    const v = (i * vMax) / N;
    const F = 0.5 * Cd * rho * v * v * A;
    return {
      v: Number(v.toFixed(3)),
      F: Number(F.toFixed(2))
    };
  });

  // Ближайшая точка сетки к vCurrent — чтобы ReferenceLine точно попал
  const snappedV =
    vCurrent !== undefined && isFinite(vCurrent)
      ? Number(
          Math.min(
            vMax,
            Math.max(0, Math.round((vCurrent / vMax) * N) * (vMax / N))
          ).toFixed(3)
        )
      : undefined;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="v"
          type="number"
          domain={[0, vMax]}
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
          formatter={(value: number) => [`${value} Н`, "F_d"]}
          labelFormatter={(v) => `v = ${v} м/с`}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {snappedV !== undefined ? (
          <ReferenceLine
            x={snappedV}
            stroke="#1d61d8"
            strokeDasharray="4 4"
            label={{
              value: `v = ${vCurrent}`,
              fontSize: 11,
              fill: "#1d61d8",
              position: "top"
            }}
          />
        ) : null}
        <Line
          type="monotone"
          dataKey="F"
          name={`F_d при C_d = ${Cd}, ρ = ${rho} кг/м³, A = ${A} м²`}
          stroke="#1d61d8"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
