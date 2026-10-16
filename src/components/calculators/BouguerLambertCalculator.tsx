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

export function BouguerLambertCalculator() {
  const [hc, setHc] = useState<number>(30);       // высота Солнца, °
  const [p, setP] = useState<number>(0.7);         // коэффициент прозрачности
  const [F0, setF0] = useState<number>(1367);      // Вт/м² (солнечная постоянная)
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    if (hc <= 0) return { m: Infinity, F: 0, Fhoriz: 0 };
    const hcRad = (hc * Math.PI) / 180;
    const m = 1 / Math.sin(hcRad);
    const F = F0 * Math.pow(p, m);
    const Fhoriz = F * Math.sin(hcRad);
    return { m, F, Fhoriz };
  }, [hc, p, F0, calculated]);

  // График: F(h_c) при разных p
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { h: number; p50: number; p70: number; p85: number; p95: number }[] = [];
    for (let h = 0; h <= 90; h += 2) {
      const hRad = (h * Math.PI) / 180;
      const m = h > 0 ? 1 / Math.sin(hRad) : 40;
      const build = (pp: number) => Number((F0 * Math.pow(pp, m) * Math.sin(hRad)).toFixed(1));
      data.push({
        h,
        p50: build(0.5),
        p70: build(0.7),
        p85: build(0.85),
        p95: build(0.95),
      });
    }
    return data;
  }, [F0, calculated]);

  const hcOk = hc >= 0 && hc <= 90;
  const pOk = p >= 0.3 && p <= 1;
  const f0Ok = F0 >= 1000 && F0 <= 1500;
  const canCalc = hcOk && pOk && f0Ok;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Высота Солнца h_c, °</span>
          <input type="number" value={hc} step={1} min={0} max={90}
            onChange={(e) => { setHc(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!hcOk && <span className="mt-1 block text-xs text-red-600">0…90°</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Коэффициент прозрачности p</span>
          <input type="number" value={p} step={0.01} min={0.3} max={1}
            onChange={(e) => { setP(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!pOk && <span className="mt-1 block text-xs text-red-600">0.3…1.0</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Солнечная постоянная F₀, Вт/м²</span>
          <input type="number" value={F0} step={1}
            onChange={(e) => { setF0(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!f0Ok && <span className="mt-1 block text-xs text-red-600">1000…1500 Вт/м²</span>}
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
                <dt className="text-sm text-slate-600">Масса атмосферы m</dt>
                <dd className="font-mono text-sm text-slate-900">{isFinite(result.m) ? result.m.toFixed(3) : "—"}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">p^m</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {isFinite(result.m) ? Math.pow(p, result.m).toFixed(4) : "0"}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Поток на нормаль F, Вт/м²</dt>
                <dd className="font-mono text-sm text-slate-900">{result.F.toFixed(1)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600 font-semibold">Поток на горизонталь F', Вт/м²</dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">{result.Fhoriz.toFixed(1)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость F'(h_c)</h3>
            <p className="mt-1 text-sm text-slate-600">При разных коэффициентах прозрачности p.</p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="h" type="number" domain={[0, 90]}
                    ticks={[0, 15, 30, 45, 60, 75, 90]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "h_c, °", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "F', Вт/м²", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(1)} Вт/м²`, "F'"]}
                    labelFormatter={(h) => `h_c = ${h}°`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine x={hc} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `h_c = ${hc}°`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="p50" name="p = 0.5 (мутная)" stroke="#dc2626" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="p70" name="p = 0.7 (средняя)" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="p85" name="p = 0.85 (прозрачная)" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="p95" name="p = 0.95 (очень прозрачная)" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: F = F₀·p^m, где m = 1/sin(h_c) — относительная масса
        атмосферы (при h_c = 90° m = 1, при h_c = 30° m = 2, при h_c = 0° m
        → ∞). p — коэффициент прозрачности (0.5 — мутная, 0.7 — средняя, 0.85
        — прозрачная). Поток на горизонтальную поверхность: F' = F·sin(h_c).
      </p>
    </div>
  );
}
