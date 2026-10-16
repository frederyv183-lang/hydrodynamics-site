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

export function RelativeGeopotentialCalculator() {
  const [p1, setP1] = useState<number>(1000);
  const [p2, setP2] = useState<number>(500);
  const [Tavg, setTavg] = useState<number>(265);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const H = ((R * Tavg) / G0) * Math.log(p1 / p2);
    return { H };
  }, [p1, p2, Tavg, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { p2: number; t230: number; t250: number; t270: number; t290: number }[] = [];
    for (let pp = 100; pp <= p1 - 50; pp += 20) {
      const build = (T: number) => Number((((R * T) / G0) * Math.log(p1 / pp)).toFixed(0));
      data.push({
        p2: pp,
        t230: build(230),
        t250: build(250),
        t270: build(270),
        t290: build(290),
      });
    }
    return data;
  }, [p1, calculated]);

  const p1Ok = p1 >= 200 && p1 <= 1000;
  const p2Ok = p2 >= 100 && p2 < p1;
  const tOk = Tavg >= 180 && Tavg <= 320;
  const canCalc = p1Ok && p2Ok && tOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Нижняя p₁, гПа</span>
          <input type="number" value={p1} step={10} min={0}
            onChange={(e) => { setP1(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!p1Ok && <span className="mt-1 block text-xs text-red-600">200…1000 гПа</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Верхняя p₂, гПа</span>
          <input type="number" value={p2} step={10} min={0}
            onChange={(e) => { setP2(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!p2Ok && <span className="mt-1 block text-xs text-red-600">100 ≤ p₂ &lt; p₁</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Средняя T, K</span>
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
                  Относительный геопотенциал H_{p1}^{p2}, гп. м
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">{result.H.toFixed(0)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость H(p₂)</h3>
            <p className="mt-1 text-sm text-slate-600">
              При p₁ = {p1} гПа и разных средних T. Чем холоднее — тем тоньше слой.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="p2" type="number" domain={[100, p1 - 50]} reversed
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "p₂, гПа", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "H, гп. м", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value} гп. м`, "H"]}
                    labelFormatter={(p) => `p₂ = ${p} гПа`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine x={p2} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `p₂ = ${p2}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="t230" name="T = 230 K" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t250" name="T = 250 K" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t270" name="T = 270 K" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t290" name="T = 290 K" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: H_{p1}^{p2} = (R/g₀)·∫T·d ln p ≈ (R·T̄/g₀)·ln(p₁/p₂), где T̄ —
        средняя температура слоя между p₁ и p₂. Толщина слоя 1000–500 гПа при
        T = 265 K ≈ 5500 гп. м. Чем теплее слой — тем он толще (используется
        для термического анализа и адвекции).
      </p>
    </div>
  );
}
