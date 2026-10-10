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

// Упругость насыщения над водой (Магнус), T в °C, E в гПа
function eWater(T: number): number {
  return 6.112 * Math.exp((17.67 * T) / (T + 243.5));
}

// Упругость насыщения надо льдом, T в °C, E в гПа
function eIce(T: number): number {
  return 6.112 * Math.exp((22.46 * T) / (T + 272.62));
}

type Row = {
  T: number;
  water: number;
  ice: number;
};

const data: Row[] = [];
for (let T = -20; T <= 40; T += 1) {
  data.push({
    T,
    water: Number(eWater(T).toFixed(2)),
    ice: Number(eIce(T).toFixed(2))
  });
}

export default function PhaseTransitionsChart() {
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
          domain={[-20, 40]}
          ticks={[-20, -10, 0, 10, 20, 30, 40]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Температура T, °C",
            position: "insideBottomRight",
            offset: -4,
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <YAxis
          type="number"
          domain={[0, 80]}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
          tick={{ fontSize: 12, fill: "#475569" }}
          label={{
            value: "Упругость насыщения E, гПа",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "#475569" }
          }}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
          formatter={(value: number, name: string) => {
            if (name === "water") return [`${value.toFixed(2)} гПа`, "Над водой"];
            if (name === "ice") return [`${value.toFixed(2)} гПа`, "Надо льдом"];
            return [value, name];
          }}
          labelFormatter={(label) => `T = ${label} °C`}
        />
        <Legend
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value) =>
            value === "water" ? "Над водой" : value === "ice" ? "Надо льдом" : value
          }
        />
        <Line
          type="monotone"
          dataKey="water"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="ice"
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