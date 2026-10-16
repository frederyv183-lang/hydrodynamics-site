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

export function TmaxForecastCalculator() {
  const [t700, setT700] = useState<number>(5); // °C на 700 гПа
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const tMax = t700 + 23;
    return { tMax };
  }, [t700, calculated]);

  // График: T_max(T_700)
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { t700: number; tMax: number }[] = [];
    for (let t = -30; t <= 25; t += 1) {
      data.push({ t700: t, tMax: t + 23 });
    }
    return data;
  }, [calculated]);

  const tOk = t700 >= -50 && t700 <= 35;
  const canCalc = tOk;

  const verdict = useMemo(() => {
    if (!result) return null;
    if (result.tMax < 0) return { text: "❄️ Дневная температура остаётся ниже 0 °C", color: "border-blue-300 bg-blue-50 text-blue-800" };
    if (result.tMax > 30) return { text: "🔥 Жарко (> 30 °C) — учитывайте при планировании", color: "border-red-300 bg-red-50 text-red-800" };
    return { text: "✅ Комфортный дневной прогрев", color: "border-green-300 bg-green-50 text-green-800" };
  }, [result]);

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Температура на 700 гПа, T₇₀₀, °C
        </span>
        <input
          type="number"
          value={t700}
          step={0.1}
          onChange={(e) => { setT700(Number(e.target.value)); markDirty(); }}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                     focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        {!tOk && <span className="mt-1 block text-xs text-red-600">−50…+35 °C</span>}
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
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Прогноз T_max, °C
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.tMax.toFixed(2)}
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
              Зависимость T_max от T₇₀₀
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Линейная зависимость с коэффициентом +23.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="t700" type="number" domain={[-30, 25]}
                    ticks={[-30, -20, -10, 0, 10, 20, 25]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "T₇₀₀, °C", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "T_max, °C", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(2)} °C`, "T_max"]}
                    labelFormatter={(t) => `T₇₀₀ = ${t} °C`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={0} stroke="#3b82f6" strokeDasharray="4 4"
                    label={{ value: "0 °C", fontSize: 11, fill: "#3b82f6", position: "insideTopLeft" }} />
                  <ReferenceLine x={t700} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `T₇₀₀ = ${t700}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="tMax" name="T_max" stroke="#1d61d8" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: T_max = T₇₀₀ + 23. T₇₀₀ — температура воздуха на изобарической
        поверхности 700 гПа (≈ 3000 м). Эмпирическая связь для умеренных
        широт. Учитывает дневной прогрев за счёт солнечной радиации и
        конвекции.
      </p>
    </div>
  );
}
