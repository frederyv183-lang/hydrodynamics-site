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

const R = 287.05;
const G0 = 9.80665;

export function AbsoluteGeopotentialCalculator() {
  const [p, setP] = useState<number>(500);
  const [Tavg, setTavg] = useState<number>(255);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const p0 = 1000;
    const H = ((R * Tavg) / G0) * Math.log(p0 / p);
    return { H };
  }, [p, Tavg, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { p: number; t230: number; t255: number; t280: number; t300: number }[] = [];
    for (let pp = 100; pp <= 1000; pp += 20) {
      const build = (T: number) => Number((((R * T) / G0) * Math.log(1000 / pp)).toFixed(0));
      data.push({
        p: pp,
        t230: build(230),
        t255: build(255),
        t280: build(280),
        t300: build(300),
      });
    }
    return data;
  }, [calculated]);

  const pOk = p >= 100 && p <= 1000;
  const tOk = Tavg >= 180 && Tavg <= 320;
  const canCalc = pOk && tOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Давление p, гПа</span>
          <input type="number" value={p} step={10} min={0}
            onChange={(e) => { setP(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!pOk && <span className="mt-1 block text-xs text-red-600">100…1000 гПа</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Средняя температура T, K</span>
          <input type="number" value={Tavg} step={1}
            onChange={(e) => { setTavg(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!tOk && <span className="mt-1 block text-xs text-red-600">180…320 K</span>}
        </label>
      </div>

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
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Абсолютный геопотенциал H_p, гп. м
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">{result.H.toFixed(0)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость H_p(p)</h3>
            <p className="mt-1 text-sm text-slate-600">При разных средних температурах.</p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="p" type="number" domain={[100, 1000]} reversed
                    ticks={[100, 200, 300, 500, 700, 850, 1000]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "p, гПа", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "H_p, гп. м", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value} гп. м`, "H_p"]}
                    labelFormatter={(p) => `p = ${p} гПа`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine x={p} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `p = ${p}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="t230" name="T = 230 K" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t255" name="T = 255 K" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t280" name="T = 280 K" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t300" name="T = 300 K" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: H_p = (R/g₀)·∫T·d ln p ≈ (R·T̄/g₀)·ln(p₀/p), где R = 287.05
        Дж/(кг·К), g₀ = 9.807 м/с², T̄ — средняя температура слоя. Используется
        для карт АТ-500 (H₅₀₀ ≈ 5500 гп. м), АТ-850 и др.
      </p>
    </div>
  );
}
