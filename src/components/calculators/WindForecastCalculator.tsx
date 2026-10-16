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

export function WindForecastCalculator() {
  const [dp, setDp] = useState<number>(3); // гПа/3 ч
  const [k, setK] = useState<number>(3);   // коэффициент (м/с на гПа)
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const u = k * dp;
    return { u };
  }, [dp, k, calculated]);

  // График: U(Δp) при разных k
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { dp: number; k2: number; k3: number; k5: number; k8: number }[] = [];
    for (let d = 0; d <= 15; d += 0.5) {
      data.push({
        dp: Number(d.toFixed(1)),
        k2: Number((2 * d).toFixed(1)),
        k3: Number((3 * d).toFixed(1)),
        k5: Number((5 * d).toFixed(1)),
        k8: Number((8 * d).toFixed(1)),
      });
    }
    return data;
  }, [calculated]);

  const dpOk = dp >= 0 && dp <= 20;
  const kOk = k >= 0.5 && k <= 15;
  const canCalc = dpOk && kOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Барическая тенденция Δp, гПа/3 ч
          </span>
          <input
            type="number"
            value={dp}
            step={0.5}
            min={0}
            onChange={(e) => { setDp(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!dpOk && <span className="mt-1 block text-xs text-red-600">0…20 гПа/3 ч</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Коэффициент k, (м/с)/гПа
          </span>
          <input
            type="number"
            value={k}
            step={0.5}
            min={0}
            onChange={(e) => { setK(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!kOk && <span className="mt-1 block text-xs text-red-600">0.5…15</span>}
        </label>
      </div>

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
                  Прогноз скорости ветра U, м/с
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.u.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600">В км/ч</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {(result.u * 3.6).toFixed(1)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Зависимость U от барической тенденции
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              При разных значениях коэффициента k.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dp" type="number" domain={[0, 15]}
                    ticks={[0, 3, 6, 9, 12, 15]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "Δp, гПа/3 ч", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "U, м/с", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(1)} м/с`, "U"]}
                    labelFormatter={(d) => `Δp = ${d} гПа/3 ч`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine x={dp} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `Δp = ${dp}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="k2" name="k = 2" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="k3" name="k = 3" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="k5" name="k = 5" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="k8" name="k = 8" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: U = k·Δp, где Δp — барическая тенденция (гПа/3 ч), k —
        эмпирический коэффициент (обычно 2…8 (м/с)/гПа). Метод используется
        для оценки усиления ветра при прохождении фронта или углублении
        циклона.
      </p>
    </div>
  );
}
