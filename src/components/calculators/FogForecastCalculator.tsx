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

type Method = "petrenko" | "dewpoint";

export function FogForecastCalculator() {
  const [method, setMethod] = useState<Method>("petrenko");
  const [td, setTd] = useState<number>(10);   // T_d, °C
  const [dTd, setDTd] = useState<number>(3);  // ΔT_d, °C
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    if (method === "petrenko") {
      const tR = td - dTd;
      return { tR, note: "T_r — температура туманообразования" };
    } else {
      // dewpoint: туман образуется, если T ночью опустится до T_d
      return { tR: td, note: "Туман образуется при T ночью = T_d" };
    }
  }, [method, td, dTd, calculated]);

  // График: T_r(T_d) при разных ΔT_d
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { td: number; d1: number; d3: number; d5: number; d8: number }[] = [];
    for (let t = -10; t <= 30; t += 1) {
      data.push({
        td: t,
        d1: t - 1,
        d3: t - 3,
        d5: t - 5,
        d8: t - 8,
      });
    }
    return data;
  }, [calculated]);

  const tdOk = td >= -30 && td <= 40;
  const dTdOk = dTd >= 0 && dTd <= 15;
  const canCalc = method === "petrenko" ? (tdOk && dTdOk) : tdOk;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { setMethod("petrenko"); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            method === "petrenko" ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          Метод Петренко (по ΔT_d)
        </button>
        <button type="button" onClick={() => { setMethod("dewpoint"); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            method === "dewpoint" ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          Простой метод (T_r = T_d)
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Точка росы T_d, °C
          </span>
          <input type="number" value={td} step={0.1}
            onChange={(e) => { setTd(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!tdOk && <span className="mt-1 block text-xs text-red-600">−30…+40 °C</span>}
        </label>

        {method === "petrenko" && (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Дефицит точки росы ΔT_d, °C
            </span>
            <input type="number" value={dTd} step={0.1} min={0}
              onChange={(e) => { setDTd(Number(e.target.value)); markDirty(); }}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
            {!dTdOk && <span className="mt-1 block text-xs text-red-600">0…15 °C</span>}
          </label>
        )}
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
                  Температура туманообразования T_r, °C
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.tR.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-blue-300 bg-blue-50 p-3 text-sm text-blue-800">
            🌫️ Если ночью температура опустится до <strong>{result.tR.toFixed(1)} °C</strong> или ниже —
            образуется туман. {result.note}.
          </div>

          {method === "petrenko" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Зависимость T_r от точки росы
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                При разных значениях дефицита ΔT_d.
              </p>
              <div className="mt-4" style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="td" type="number" domain={[-10, 30]}
                      ticks={[-10, -5, 0, 5, 10, 15, 20, 25, 30]} tick={{ fontSize: 12, fill: "#475569" }}
                      label={{ value: "T_d, °C", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                    <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                      label={{ value: "T_r, °C", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                      formatter={(value: number) => [`${value.toFixed(1)} °C`, "T_r"]}
                      labelFormatter={(t) => `T_d = ${t} °C`} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <ReferenceLine y={0} stroke="#3b82f6" strokeDasharray="4 4"
                      label={{ value: "0 °C", fontSize: 11, fill: "#3b82f6", position: "insideTopLeft" }} />
                    <ReferenceLine x={td} stroke="#1d61d8" strokeDasharray="4 4"
                      label={{ value: `T_d = ${td}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                    <Line type="monotone" dataKey="d1" name="ΔT_d = 1 °C" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="d3" name="ΔT_d = 3 °C" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="d5" name="ΔT_d = 5 °C" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="d8" name="ΔT_d = 8 °C" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула Петренко: T_r = T_d − ΔT_d, где ΔT_d — дефицит точки росы
        (обычно 2…5 °C для радиационных туманов). Туман образуется, если
        ночная температура опускается до T_r или ниже. Простой метод: туман
        ожидается при T_min ≈ T_d.
      </p>
    </div>
  );
}
