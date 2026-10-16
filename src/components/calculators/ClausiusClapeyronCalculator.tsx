"use client";

import { useMemo, useState } from "react";
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
import { cn } from "@/lib/cn";

function eWater(T: number): number {
  return 6.112 * Math.exp((17.67 * T) / (T + 243.5));
}
function eIce(T: number): number {
  return 6.112 * Math.exp((22.46 * T) / (T + 272.62));
}
function dEdT_water(T: number): number {
  const E = eWater(T);
  return (E * 17.67 * 243.5) / Math.pow(T + 243.5, 2);
}
function dEdT_ice(T: number): number {
  const E = eIce(T);
  return (E * 22.46 * 272.62) / Math.pow(T + 272.62, 2);
}

export function ClausiusClapeyronCalculator() {
  const [T, setT] = useState<number>(20);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const Ewater = eWater(T);
    const Eice = T <= 0 ? eIce(T) : NaN;
    const dEwater = dEdT_water(T);
    const dEice = T <= 0 ? dEdT_ice(T) : NaN;
    const Lw = 2.5e6;
    const Rw = 461;
    const T_K = T + 273.15;
    const ratio = Lw / (Rw * T_K * T_K);
    return { Ewater, Eice, dEwater, dEice, ratio };
  }, [T, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { T: number; water: number; ice: number | null }[] = [];
    for (let t = -40; t <= 50; t += 1) {
      data.push({
        T: t,
        water: Number(eWater(t).toFixed(2)),
        ice: t <= 0 ? Number(eIce(t).toFixed(2)) : null,
      });
    }
    return data;
  }, [calculated]);

  const tOk = T >= -40 && T <= 50;
  const canCalc = tOk;

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Температура T, °C</span>
        <input type="number" value={T} step={0.5}
          onChange={(e) => { setT(Number(e.target.value)); markDirty(); }}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        {!tOk && <span className="mt-1 block text-xs text-red-600">−40…+50 °C</span>}
      </label>

      <div>
        <button type="button" onClick={() => setCalculated(true)} disabled={!canCalc}
          className={cn("rounded-md px-4 py-2 text-sm font-medium text-white transition",
            !canCalc ? "cursor-not-allowed bg-slate-300" : "bg-brand-600 hover:bg-brand-700")}>
          Рассчитать
        </button>
      </div>

      {result && (
        <>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Результаты</h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">E над водой, гПа</dt>
                <dd className="font-mono text-sm text-slate-900">{result.Ewater.toFixed(3)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">dE/dT над водой, гПа/К</dt>
                <dd className="font-mono text-sm text-slate-900">{result.dEwater.toFixed(4)}</dd>
              </div>
              {T <= 0 && (
                <>
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-sm text-slate-600">E надо льдом, гПа</dt>
                    <dd className="font-mono text-sm text-slate-900">{result.Eice.toFixed(3)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <dt className="text-sm text-slate-600">dE/dT надо льдом, гПа/К</dt>
                    <dd className="font-mono text-sm text-slate-900">{result.dEice.toFixed(4)}</dd>
                  </div>
                </>
              )}
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  L/(R_n·T²), 1/К
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.ratio.toExponential(3)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Упругость насыщения E(T)</h3>
            <p className="mt-1 text-sm text-slate-600">
              Над водой (вся область) и надо льдом (T ≤ 0 °C).
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="T" type="number" domain={[-40, 50]}
                    ticks={[-40, -30, -20, -10, 0, 10, 20, 30, 40, 50]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "T, °C", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis type="number" domain={[0, 130]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "E, гПа", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(2)} гПа`, ""]}
                    labelFormatter={(t) => `T = ${t} °C`} />
                  <Legend wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => value === "water" ? "Над водой" : value === "ice" ? "Надо льдом" : value} />
                  <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="4 4"
                    label={{ value: "0 °C", fontSize: 11, fill: "#64748b", position: "top" }} />
                  <ReferenceLine x={T} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `T = ${T}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="water" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="ice" stroke="#6366f1" strokeWidth={2} strokeDasharray="6 4" dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: (1/E)·dE/dT = L/(R_n·T²). L — теплота парообразования
        (2.5·10⁶ Дж/кг для воды, 2.83·10⁶ Дж/кг для льда), R_n = 461
        Дж/(кг·К). Над льдом E(T) меньше, чем над водой — эффект
        Вегенера-Бержерона.
      </p>
    </div>
  );
}
