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

const G0 = 9.80665;
const A = 6.371e6;

function gAt(z: number): number {
  return G0 * Math.pow(A / (A + z), 2);
}

export function GeopotentialCalculator() {
  const [z, setZ] = useState<number>(10000);
  const [useVariableG, setUseVariableG] = useState<boolean>(false);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    if (!useVariableG) {
      return { phi: G0 * z, gz: G0 };
    }
    const N = 1000;
    const dz = z / N;
    let sum = 0;
    for (let i = 0; i < N; i++) {
      const z1 = i * dz;
      const z2 = (i + 1) * dz;
      sum += ((gAt(z1) + gAt(z2)) / 2) * dz;
    }
    return { phi: sum, gz: gAt(z) };
  }, [z, useVariableG, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { z: number; phiConst: number; phiVar: number }[] = [];
    for (let zz = 0; zz <= 50000; zz += 1000) {
      const phiConst = G0 * zz;
      const N = 200;
      const dz = zz / N;
      let sum = 0;
      for (let i = 0; i < N; i++) {
        const z1 = i * dz;
        const z2 = (i + 1) * dz;
        sum += ((gAt(z1) + gAt(z2)) / 2) * dz;
      }
      data.push({ z: zz, phiConst: Number((phiConst / 1000).toFixed(2)), phiVar: Number((sum / 1000).toFixed(2)) });
    }
    return data;
  }, [calculated]);

  const zOk = z >= 0 && z <= 100000;
  const canCalc = zOk;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { setUseVariableG(false); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            !useVariableG ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          g = const (9.807 м/с²)
        </button>
        <button type="button" onClick={() => { setUseVariableG(true); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            useVariableG ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          g(z) — переменное
        </button>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Высота z, м</span>
        <input type="number" value={z} step={1000} min={0}
          onChange={(e) => { setZ(Number(e.target.value)); markDirty(); }}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        {!zOk && <span className="mt-1 block text-xs text-red-600">0…100000 м</span>}
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
                <dt className="text-sm text-slate-600">g(z), м/с²</dt>
                <dd className="font-mono text-sm text-slate-900">{result.gz.toFixed(5)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">Геопотенциал Φ, Дж/кг = м²/с²</dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">{result.phi.toFixed(2)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600">Геопотенциальная высота H = Φ/g₀, м</dt>
                <dd className="font-mono text-sm text-slate-900">{(result.phi / G0).toFixed(2)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость Φ(z)</h3>
            <p className="mt-1 text-sm text-slate-600">
              Сравнение постоянного и переменного g. На высотах до 100 км различия заметны.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="z" type="number" domain={[0, 50000]}
                    ticks={[0, 10000, 20000, 30000, 40000, 50000]} tick={{ fontSize: 12, fill: "#475569" }}
                    tickFormatter={(v) => `${v / 1000} км`}
                    label={{ value: "z, км", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "Φ, кДж/кг", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value} кДж/кг`, "Φ"]}
                    labelFormatter={(z) => `z = ${z} м`} />
                  <Legend wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => value === "phiConst" ? "g = const" : "g(z) — переменное"} />
                  <ReferenceLine x={z} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `z = ${z}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="phiConst" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="phiVar" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 4" dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: Φ = ∫₀ᶻ g·dz. При постоянном g: Φ = g·z. Учёт переменного
        g(z) = g₀·(R/(R+z))² даёт разницу ~0.2% на высоте 10 км. Геопотенциальная
        высота H = Φ/g₀ — «эквивалентная» высота в однородном поле тяжести.
      </p>
    </div>
  );
}
