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

export function VorticityCalculator() {
  const [zeta0, setZeta0] = useState<number>(5e-5);  // с⁻¹
  const [f0, setF0] = useState<number>(1.1e-4);      // с⁻¹ (широта 50°)
  const [D, setD] = useState<number>(1e-5);          // с⁻¹ (дивергенция)
  const [T, setT] = useState<number>(3600);          // с — время
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const absoluteVort = zeta0 + f0;
    const absFinal = absoluteVort * Math.exp(-D * T);
    const zetaFinal = absFinal - f0;
    return { absoluteVort, absFinal, zetaFinal };
  }, [zeta0, f0, D, T, calculated]);

  // График: ζ(t) при разных D
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { t: number; d0: number; d1: number; d5: number; dn1: number }[] = [];
    for (let t = 0; t <= 21600; t += 600) {
      const abs0 = zeta0 + f0;
      const build = (dd: number) => {
        const absF = abs0 * Math.exp(-dd * t);
        return Number((absF - f0).toExponential(3));
      };
      data.push({
        t,
        d0: build(0),
        d1: build(1e-5),
        d5: build(5e-5),
        dn1: build(-1e-5),
      });
    }
    return data;
  }, [zeta0, f0, calculated]);

  const zetaOk = zeta0 >= -5e-4 && zeta0 <= 5e-4;
  const fOk = f0 >= -1.5e-4 && f0 <= 1.5e-4;
  const dOk = D >= -1e-4 && D <= 1e-4;
  const tOk = T >= 0 && T <= 86400;
  const canCalc = zetaOk && fOk && dOk && tOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Относительный вихрь ζ₀, с⁻¹</span>
          <input type="number" value={zeta0} step={1e-6}
            onChange={(e) => { setZeta0(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!zetaOk && <span className="mt-1 block text-xs text-red-600">−5×10⁻⁴…+5×10⁻⁴ с⁻¹</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Параметр Кориолиса f₀, с⁻¹</span>
          <input type="number" value={f0} step={1e-6}
            onChange={(e) => { setF0(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!fOk && <span className="mt-1 block text-xs text-red-600">−1.5×10⁻⁴…+1.5×10⁻⁴ с⁻¹</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Дивергенция D, с⁻¹</span>
          <input type="number" value={D} step={1e-6}
            onChange={(e) => { setD(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!dOk && <span className="mt-1 block text-xs text-red-600">−10⁻⁴…+10⁻⁴ с⁻¹</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Время T, с</span>
          <input type="number" value={T} step={600}
            onChange={(e) => { setT(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!tOk && <span className="mt-1 block text-xs text-red-600">0…86400 с</span>}
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
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Начальный абсолютный вихрь ζ₀+f₀</dt>
                <dd className="font-mono text-sm text-slate-900">{result.absoluteVort.toExponential(3)} с⁻¹</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Конечный абсолютный вихрь</dt>
                <dd className="font-mono text-sm text-slate-900">{result.absFinal.toExponential(3)} с⁻¹</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">Конечный относительный вихрь ζ</dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">{result.zetaFinal.toExponential(3)} с⁻¹</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-slate-300 bg-slate-50 p-3 text-xs text-slate-700">
            <strong>Примечание</strong>: при D &gt; 0 (дивергенция, расходимость) вихрь затухает;
            при D &lt; 0 (конвергенция, сходимость) — усиливается. Это объясняет,
            почему в областях сходимости (например, у поверхности земли в циклоне)
            развиваются интенсивные вихри.
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Изменение вихря ζ(t)</h3>
            <p className="mt-1 text-sm text-slate-600">
              При разных значениях дивергенции D.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="t" type="number" domain={[0, 21600]}
                    ticks={[0, 3600, 7200, 10800, 14400, 18000, 21600]} tick={{ fontSize: 12, fill: "#475569" }}
                    tickFormatter={(v) => `${(v / 3600).toFixed(1)}ч`}
                    label={{ value: "Время, ч", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    tickFormatter={(v) => v.toExponential(1)}
                    label={{ value: "ζ, с⁻¹", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [value.toExponential(3), "ζ"]}
                    labelFormatter={(t) => `t = ${(t / 3600).toFixed(2)} ч`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="d0" name="D = 0" stroke="#94a3b8" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="d1" name="D = +10⁻⁵ (дивергенция)" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="d5" name="D = +5×10⁻⁵ (сильная диверг.)" stroke="#dc2626" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="dn1" name="D = −10⁻⁵ (конвергенция)" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: d(ζ+f)/dt = −(ζ+f)·D. Решение: ζ+f = (ζ₀+f₀)·e^(−D·t).
        Дивергенция D &gt; 0 (расходимость) уменьшает вихрь, D &lt; 0
        (сходимость) — увеличивает. Это следствие сохранения потенциального
        вихря и одно из ключевых уравнений динамической метеорологии.
      </p>
    </div>
  );
}
