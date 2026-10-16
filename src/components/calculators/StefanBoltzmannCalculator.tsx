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

const SIGMA = 5.670374419e-8; // Вт/(м²·К⁴)

export function StefanBoltzmannCalculator() {
  const [T, setT] = useState<number>(6000); // K
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const B = SIGMA * Math.pow(T, 4);
    return { B };
  }, [T, calculated]);

  // График: B(T) для диапазона 100–7000 K
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { T: number; B: number }[] = [];
    for (let t = 100; t <= 7000; t += 100) {
      data.push({ T: t, B: Number((SIGMA * Math.pow(t, 4)).toFixed(0)) });
    }
    return data;
  }, [calculated]);

  const tOk = T >= 1 && T <= 20000;
  const canCalc = tOk;

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Температура T, К
        </span>
        <input
          type="number"
          value={T}
          step={10}
          min={1}
          onChange={(e) => { setT(Number(e.target.value)); markDirty(); }}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                     focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        {!tOk && <span className="mt-1 block text-xs text-red-600">1…20000 K</span>}
      </label>

      <div>
        <button
          type="button"
          onClick={() => setCalculated(true)}
          disabled={!canCalc}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium text-white transition",
            !canCalc ? "cursor-not-allowed bg-slate-300" : "bg-brand-600 hover:bg-brand-700"
          )}
        >
          Рассчитать
        </button>
      </div>

      {result && (
        <>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Результаты</h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">T, °C</dt>
                <dd className="font-mono text-sm text-slate-900">{(T - 273.15).toFixed(2)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Полный поток излучения B, Вт/м²
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.B.toExponential(3)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Зависимость B от температуры (T⁴)
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Излучение растёт как 4-я степень температуры. Для Солнца (6000 K)
              B ≈ 7.35×10⁷ Вт/м², для Земли (288 K) — ≈ 390 Вт/м².
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="T" type="number" domain={[100, 7000]}
                    ticks={[100, 1000, 2000, 3000, 4000, 5000, 6000, 7000]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "T, K", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    tickFormatter={(v: number) => v.toExponential(0)}
                    label={{ value: "B, Вт/м²", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toExponential(3)} Вт/м²`, "B"]}
                    labelFormatter={(t) => `T = ${t} K`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine x={T} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `T = ${T} K`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="B" name="B = σT⁴" stroke="#1d61d8" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: B = σ·T⁴, где σ = 5.670374419×10⁻⁸ Вт/(м²·К⁴) — постоянная
        Стефана-Больцмана. Закон справедлив для абсолютно чёрного тела. Для
        реальных тел: B = ε·σ·T⁴, где ε — излучательная способность (0…1).
      </p>
    </div>
  );
}
