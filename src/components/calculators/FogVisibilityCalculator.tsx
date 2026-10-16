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

export function FogVisibilityCalculator() {
  const [q, setQ] = useState<number>(0.1); // г/м³ — водность
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    if (q <= 0) return { sm: 0 };
    const sm = 60 / Math.sqrt(q);
    return { sm };
  }, [q, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { q: number; sm: number }[] = [];
    for (let qq = 0.02; qq <= 1; qq += 0.02) {
      data.push({ q: Number(qq.toFixed(2)), sm: Number((60 / Math.sqrt(qq)).toFixed(1)) });
    }
    return data;
  }, [calculated]);

  const qOk = q >= 0.01 && q <= 1.5;
  const canCalc = qOk;

  // Классификация видимости по РД 52.04.567
  const verdict = useMemo(() => {
    if (!result) return null;
    if (result.sm >= 1000) return { text: "✅ Хорошая видимость (> 1 км)", color: "border-green-300 bg-green-50 text-green-800" };
    if (result.sm >= 500) return { text: "⚠️ Умеренный туман (500…1000 м)", color: "border-amber-300 bg-amber-50 text-amber-800" };
    if (result.sm >= 50) return { text: "⚠️ Сильный туман (50…500 м)", color: "border-amber-300 bg-amber-50 text-amber-800" };
    return { text: "🚨 Очень сильный туман (< 50 м) — опасность для авиации и транспорта", color: "border-red-300 bg-red-50 text-red-800" };
  }, [result]);

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Водность тумана q, г/м³
        </span>
        <input type="number" value={q} step={0.01} min={0}
          onChange={(e) => { setQ(Number(e.target.value)); markDirty(); }}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        {!qOk && <span className="mt-1 block text-xs text-red-600">0.01…1.5 г/м³</span>}
      </label>

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
                  Метеорологическая дальность видимости S_m, м
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.sm.toFixed(0)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600">В километрах</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {(result.sm / 1000).toFixed(3)} км
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
              Зависимость S_m от водности
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              S_m = 60/√q. Обратная квадратичная зависимость.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="q" type="number" domain={[0, 1]}
                    ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "q, г/м³", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis type="number" scale="log" domain={[60, 500]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "S_m, м (лог.)", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value} м`, "S_m"]}
                    labelFormatter={(q) => `q = ${q} г/м³`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={1000} stroke="#22c55e" strokeDasharray="4 4"
                    label={{ value: "1 км (порог тумана)", fontSize: 11, fill: "#16a34a", position: "insideTopRight" }} />
                  <ReferenceLine y={500} stroke="#f59e0b" strokeDasharray="4 4"
                    label={{ value: "500 м", fontSize: 11, fill: "#d97706", position: "insideTopRight" }} />
                  <ReferenceLine x={q} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `q = ${q}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="sm" name="S_m(q)" stroke="#1d61d8" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: S_m = 60/√q, где q — водность тумана (г/м³), S_m — видимость
        (м). Классификация: 500…1000 м — умеренный туман, 50…500 м — сильный,
        &lt; 50 м — очень сильный (опасен для авиации).
      </p>
    </div>
  );
}
