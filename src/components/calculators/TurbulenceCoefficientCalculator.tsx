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

const KAPPA = 0.4;

export function TurbulenceCoefficientCalculator() {
  const [uStar, setUStar] = useState<number>(0.3); // м/с
  const [z0, setZ0] = useState<number>(0.03);       // м
  const [z, setZ] = useState<number>(10);           // м
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    if (z <= z0 || uStar <= 0) return null;
    const K = KAPPA * uStar * z;
    const rho = 1.225;
    const tau = rho * uStar * uStar;
    return { K, tau };
  }, [uStar, z0, z, calculated]);

  // График: K(z) при разных u*
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { z: number; u01: number; u03: number; u05: number; u10: number }[] = [];
    for (let zz = 0.5; zz <= 100; zz *= 1.2) {
      data.push({
        z: Number(zz.toFixed(2)),
        u01: Number((KAPPA * 0.1 * zz).toFixed(3)),
        u03: Number((KAPPA * 0.3 * zz).toFixed(3)),
        u05: Number((KAPPA * 0.5 * zz).toFixed(3)),
        u10: Number((KAPPA * 1.0 * zz).toFixed(3)),
      });
    }
    return data;
  }, [calculated]);

  const usOk = uStar >= 0.01 && uStar <= 2;
  const z0Ok = z0 >= 0.001 && z0 <= 5;
  const zOk = z > z0 && z <= 200;
  const canCalc = usOk && z0Ok && zOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Динамическая скорость v*, м/с</span>
          <input type="number" value={uStar} step={0.05} min={0}
            onChange={(e) => { setUStar(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!usOk && <span className="mt-1 block text-xs text-red-600">0.01…2 м/с</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Шероховатость z₀, м</span>
          <input type="number" value={z0} step={0.01} min={0}
            onChange={(e) => { setZ0(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!z0Ok && <span className="mt-1 block text-xs text-red-600">0.001…5 м</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Высота z, м</span>
          <input type="number" value={z} step={1} min={0}
            onChange={(e) => { setZ(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!zOk && <span className="mt-1 block text-xs text-red-600">z &gt; z₀, до 200 м</span>}
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
                <dt className="text-sm text-slate-600">Напряжение трения τ, Па</dt>
                <dd className="font-mono text-sm text-slate-900">{result.tau.toExponential(3)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Динамическая скорость v*, м/с</dt>
                <dd className="font-mono text-sm text-slate-900">{uStar.toFixed(3)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Коэффициент турбулентности K, м²/с
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">{result.K.toFixed(3)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Профиль K(z) при разных v*</h3>
            <p className="mt-1 text-sm text-slate-600">
              Линейный рост K с высотой (при нейтральной стратификации).
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="u03" type="number" domain={[0, 40]}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "K, м²/с", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis dataKey="z" type="number" scale="log" domain={[0.5, 100]}
                    ticks={[0.5, 1, 2, 5, 10, 20, 50, 100]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "z, м (лог.)", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number, name: string) => {
                      const labels: Record<string, string> = {
                        u01: "v* = 0.1", u03: "v* = 0.3", u05: "v* = 0.5", u10: "v* = 1.0"
                      };
                      return [`${value.toFixed(3)} м²/с`, labels[name] ?? name];
                    }}
                    labelFormatter={(label) => `z ≈ ${label} м`} />
                  <Legend wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => {
                      const labels: Record<string, string> = {
                        u01: "v* = 0.1 м/с", u03: "v* = 0.3 м/с", u05: "v* = 0.5 м/с", u10: "v* = 1.0 м/с"
                      };
                      return labels[value] ?? value;
                    }} />
                  <Line type="monotone" dataKey="u01" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="u03" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="u05" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="u10" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: K = k·v*·z (нейтральная стратификация), где k = 0.4 —
        константа Кармана, v* — динамическая скорость. v* = √(τ/ρ), τ —
        напряжение трения, ρ — плотность воздуха. K растёт линейно с высотой
        в приземном слое.
      </p>
    </div>
  );
}
