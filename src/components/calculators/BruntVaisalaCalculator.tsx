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

const G = 9.80665;

export function BruntVaisalaCalculator() {
  const [theta, setTheta] = useState<number>(300);
  const [dThetaDz, setDThetaDz] = useState<number>(0.005);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const ratio = (G / theta) * dThetaDz;
    if (ratio < 0) return { N: NaN, period: NaN, unstable: true };
    const N = Math.sqrt(ratio);
    const period = N > 0 ? (2 * Math.PI) / N : Infinity;
    return { N, period, unstable: false };
  }, [theta, dThetaDz, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { dTheta: number; t280: number; t300: number; t320: number; t350: number }[] = [];
    for (let d = 0; d <= 0.02; d += 0.0005) {
      const build = (t: number) => {
        const ratio = (G / t) * d;
        return ratio > 0 ? Number(Math.sqrt(ratio).toFixed(5)) : 0;
      };
      data.push({
        dTheta: Number((d * 1000).toFixed(2)),
        t280: build(280),
        t300: build(300),
        t320: build(320),
        t350: build(350),
      });
    }
    return data;
  }, [calculated]);

  const thetaOk = theta >= 200 && theta <= 400;
  const dOk = dThetaDz >= -0.02 && dThetaDz <= 0.02;
  const canCalc = thetaOk && dOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Потенциальная T θ, K</span>
          <input type="number" value={theta} step={1}
            onChange={(e) => { setTheta(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!thetaOk && <span className="mt-1 block text-xs text-red-600">200…400 K</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">∂θ/∂z, K/м</span>
          <input type="number" value={dThetaDz} step={0.0005}
            onChange={(e) => { setDThetaDz(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!dOk && <span className="mt-1 block text-xs text-red-600">−0.02…+0.02 K/м</span>}
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
                <dt className="text-sm text-slate-600 font-semibold">N, с⁻¹</dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {isNaN(result.N) ? "—" : result.N.toExponential(4)}
                </dd>
              </div>
              {!result.unstable && (
                <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                  <dt className="text-sm text-slate-600">Период колебаний, мин</dt>
                  <dd className="font-mono text-sm text-slate-900">
                    {isFinite(result.period) ? (result.period / 60).toFixed(2) : "—"}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {result.unstable && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
              ⚠️ ∂θ/∂z &lt; 0 — <strong>неустойчивая стратификация</strong>. В
              этом случае N не определено (мнимое), развивается конвекция.
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость N(∂θ/∂z)</h3>
            <p className="mt-1 text-sm text-slate-600">При разных θ.</p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dTheta" type="number" domain={[0, 20]}
                    ticks={[0, 5, 10, 15, 20]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "∂θ/∂z, K/км", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "N, с⁻¹", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(5)} с⁻¹`, "N"]}
                    labelFormatter={(d) => `∂θ/∂z = ${d} K/км`} />
                  <Legend wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => {
                      const labels: Record<string, string> = {
                        t280: "θ = 280 K", t300: "θ = 300 K", t320: "θ = 320 K", t350: "θ = 350 K"
                      };
                      return labels[value] ?? value;
                    }} />
                  <ReferenceLine x={dThetaDz * 1000} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `∂θ/∂z = ${(dThetaDz * 1000).toFixed(1)}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="t280" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t300" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t320" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="t350" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: N = √((g/θ)·∂θ/∂z). При ∂θ/∂z &gt; 0 — устойчивая
        стратификация, N определяет частоту внутренних гравитационных волн.
        При ∂θ/∂z = 0 — нейтральная стратификация (N = 0). При ∂θ/∂z &lt; 0 —
        неустойчивая (конвекция). Типичные значения: N ≈ 0.01 с⁻¹ (период
        ~10 мин).
      </p>
    </div>
  );
}
