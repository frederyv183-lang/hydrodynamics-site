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
const GAMMA_A = 0.98; // °C/100 м

export function RichardsonCalculator() {
  const [T, setT] = useState<number>(15);            // °C
  const [gamma, setGamma] = useState<number>(0.6);   // °C/100 м
  const [dudz, setDudz] = useState<number>(5);       // м/с на 100 м
  const [calculated, setCalculated] = useState<boolean>(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const T_K = T + 273.15;
    const dudz_ms = dudz / 100; // м/с на м
    const Ri = (G / T_K) * ((GAMMA_A - gamma) / 100) / (dudz_ms * dudz_ms);
    return { Ri };
  }, [T, gamma, dudz, calculated]);

  // График: Ri(γ) при разных сдвигах
  const chartData = useMemo(() => {
    const data: { gamma: number; ri_2: number; ri_5: number; ri_10: number; ri_15: number }[] = [];
    const T_K = T + 273.15;
    for (let g = -2; g <= 3; g += 0.1) {
      const gRad = g / 100;
      const build = (d: number) => {
        const dms = d / 100;
        return Number(((G / T_K) * (GAMMA_A / 100 - gRad) / (dms * dms)).toFixed(3));
      };
      data.push({
        gamma: Number(g.toFixed(2)),
        ri_2: build(2),
        ri_5: build(5),
        ri_10: build(10),
        ri_15: build(15),
      });
    }
    return data;
  }, [T]);

  const tOk = T >= -60 && T <= 60;
  const gOk = gamma >= -3 && gamma <= 3;
  const duOk = dudz > 0 && dudz <= 30;

  const verdict = useMemo(() => {
    if (!result) return null;
    if (result.Ri < 0) return { text: "Неустойчивая стратификация — конвекция и турбулентность развиваются", color: "border-red-300 bg-red-50 text-red-800" };
    if (result.Ri < 0.25) return { text: "Переходная зона — турбулентность возможна", color: "border-amber-300 bg-amber-50 text-amber-800" };
    return { text: "Устойчивая стратификация — турбулентность подавлена", color: "border-green-300 bg-green-50 text-green-800" };
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Температура T, °C
          </span>
          <input
            type="number"
            value={T}
            step={0.1}
            onChange={(e) => { setT(Number(e.target.value)); setCalculated(false); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!tOk && <span className="mt-1 block text-xs text-red-600">−60…+60 °C</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Градиент γ, °C/100 м
          </span>
          <input
            type="number"
            value={gamma}
            step={0.1}
            onChange={(e) => { setGamma(Number(e.target.value)); setCalculated(false); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!gOk && <span className="mt-1 block text-xs text-red-600">−3…+3 °C/100 м</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Сдвиг ∂u/∂z, м/с на 100 м
          </span>
          <input
            type="number"
            value={dudz}
            step={0.5}
            min={0.1}
            onChange={(e) => { setDudz(Number(e.target.value)); setCalculated(false); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!duOk && <span className="mt-1 block text-xs text-red-600">0.1…30 м/с на 100 м</span>}
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setCalculated(true)}
          disabled={!tOk || !gOk || !duOk}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium text-white transition",
            !tOk || !gOk || !duOk
              ? "cursor-not-allowed bg-slate-300"
              : "bg-brand-600 hover:bg-brand-700"
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
                <dt className="text-sm text-slate-600">γ_a − γ, °C/100 м</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {(GAMMA_A - gamma).toFixed(3)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Число Ричардсона Ri</dt>
                <dd
                  className={cn(
                    "font-mono text-lg font-semibold",
                    result.Ri < 0 ? "text-red-700" : result.Ri > 0.25 ? "text-green-700" : "text-amber-700"
                  )}
                >
                  {result.Ri.toFixed(3)}
                </dd>
              </div>
            </dl>
          </div>

          {verdict && (
            <div className={cn("rounded-lg border p-3 text-sm", verdict.color)}>
              {verdict.text}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Зависимость Ri от градиента γ
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              При T = {T} °C и разных сдвигах ветра. Ri &lt; 0 — неустойчиво,
              Ri &gt; 0.25 — устойчиво.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="gamma"
                    type="number"
                    domain={[-2, 3]}
                    ticks={[-2, -1, 0, 1, 2, 3]}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{
                      value: "Градиент γ, °C/100 м",
                      position: "insideBottomRight",
                      offset: -4,
                      style: { fontSize: 12, fill: "#475569" },
                    }}
                  />
                  <YAxis
                    domain={[-2, 4]}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{
                      value: "Ri",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12, fill: "#475569" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => value.toFixed(3)}
                    labelFormatter={(g) => `γ = ${g} °C/100 м`}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                  <ReferenceLine
                    y={0.25}
                    stroke="#22c55e"
                    strokeDasharray="4 4"
                    label={{
                      value: "Ri = 0.25 (устойчиво)",
                      fontSize: 11,
                      fill: "#16a34a",
                      position: "insideTopRight",
                    }}
                  />
                  <ReferenceLine
                    x={gamma}
                    stroke="#1d61d8"
                    strokeDasharray="4 4"
                    label={{
                      value: `γ = ${gamma}`,
                      fontSize: 11,
                      fill: "#1d61d8",
                      position: "top",
                    }}
                  />
                  <Line type="monotone" dataKey="ri_2" name="∂u/∂z = 2 м/с" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="ri_5" name="∂u/∂z = 5 м/с" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="ri_10" name="∂u/∂z = 10 м/с" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="ri_15" name="∂u/∂z = 15 м/с" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: Ri = (g/T) · (γ_a − γ) / (∂u/∂z)². γ_a ≈ 0.98 °C/100 м —
        сухоадиабатический градиент. Ri &lt; 0 — динамическая неустойчивость
        (конвекция, термики). 0 &lt; Ri &lt; 0.25 — переходная зона. Ri &gt;
        0.25 — устойчивая стратификация, турбулентность подавлена.
      </p>
    </div>
  );
}
