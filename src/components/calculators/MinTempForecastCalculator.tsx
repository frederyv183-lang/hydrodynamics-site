"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid, Legend, Line, LineChart, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { cn } from "@/lib/cn";

type Method = "zverev" | "mikhelson";

export function MinTempForecastCalculator() {
  const [method, setMethod] = useState<Method>("zverev");
  const [t13, setT13] = useState<number>(20);
  const [td13, setTd13] = useState<number>(10);
  const [td21, setTd21] = useState<number>(2);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    if (method === "zverev") {
      const deficit = t13 - td13;
      return { deficit, tMin: t13 - 0.5 * deficit - 6 };
    } else {
      return { deficit: 0, tMin: td21 - 2 };
    }
  }, [method, t13, td13, td21, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { deficit: number; tMin: number }[] = [];
    for (let d = 0; d <= 30; d += 1) {
      data.push({ deficit: d, tMin: Number((t13 - 0.5 * d - 6).toFixed(2)) });
    }
    return data;
  }, [t13, calculated]);

  const deficit = t13 - td13;
  const frost = result ? result.tMin < 0 : false;

  const t13Ok = t13 >= -60 && t13 <= 60;
  const td13Ok = td13 >= -70 && td13 <= t13;
  const td21Ok = td21 >= -70 && td21 <= 30;
  const canCalc = method === "zverev" ? (t13Ok && td13Ok) : td21Ok;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { setMethod("zverev"); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            method === "zverev" ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          Метод Зверева (по T₁₃)
        </button>
        <button type="button" onClick={() => { setMethod("mikhelson"); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            method === "mikhelson" ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          Формула Михельсона (по T_d₂₁)
        </button>
      </div>

      {method === "zverev" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Температура в 13:00, T₁₃, °C</span>
            <input type="number" value={t13} step={0.1}
              onChange={(e) => { setT13(Number(e.target.value)); markDirty(); }}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
            {!t13Ok && <span className="mt-1 block text-xs text-red-600">−60…+60 °C</span>}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Точка росы в 13:00, T_d₁₃, °C</span>
            <input type="number" value={td13} step={0.1}
              onChange={(e) => { setTd13(Number(e.target.value)); markDirty(); }}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
            {!td13Ok && <span className="mt-1 block text-xs text-red-600">T_d₁₃ ≤ T₁₃</span>}
          </label>
        </div>
      ) : (
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Точка росы в 21:00, T_d₂₁, °C</span>
          <input type="number" value={td21} step={0.1}
            onChange={(e) => { setTd21(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!td21Ok && <span className="mt-1 block text-xs text-red-600">−70…+30 °C</span>}
        </label>
      )}

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
              {method === "zverev" && (
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-sm text-slate-600">Дефицит точки росы, °C</dt>
                  <dd className="font-mono text-sm text-slate-900">{result.deficit.toFixed(2)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600">Прогноз минимальной температуры, °C</dt>
                <dd className={cn("font-mono text-lg font-semibold",
                  frost ? "text-blue-700" : "text-brand-700")}>
                  {result.tMin.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>

          <div className={cn("rounded-lg border p-3 text-sm",
            frost ? "border-blue-300 bg-blue-50 text-blue-800"
              : "border-green-300 bg-green-50 text-green-800")}>
            {frost ? "❄️ Ожидается заморозок (T_min < 0 °C)." : "✅ Заморозок не ожидается (T_min ≥ 0 °C)."}
          </div>

          {method === "zverev" && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Зависимость T_min от дефицита точки росы</h3>
              <p className="mt-1 text-sm text-slate-600">При T₁₃ = {t13} °C.</p>
              <div className="mt-4" style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="deficit" type="number" domain={[0, 30]}
                      ticks={[0, 5, 10, 15, 20, 25, 30]} tick={{ fontSize: 12, fill: "#475569" }}
                      label={{ value: "Дефицит T₁₃ − T_d₁₃, °C", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                    <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                      label={{ value: "T_min, °C", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                      formatter={(value: number) => [`${value.toFixed(2)} °C`, "T_min"]}
                      labelFormatter={(d) => `Дефицит = ${d} °C`} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <ReferenceLine y={0} stroke="#3b82f6" strokeDasharray="4 4"
                      label={{ value: "0 °C (заморозок)", fontSize: 11, fill: "#3b82f6", position: "insideTopLeft" }} />
                    <ReferenceLine x={deficit} stroke="#1d61d8" strokeDasharray="4 4"
                      label={{ value: `Дефицит = ${deficit.toFixed(1)} °C`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                    <Line type="monotone" dataKey="tMin" name="T_min" stroke="#1d61d8" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула Зверева: T_min = T₁₃ − 0.5·(T₁₃ − T_d₁₃) − 6. Формула
        Михельсона: T_min = T_d₂₁ − 2.
      </p>
    </div>
  );
}
