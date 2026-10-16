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

export function KineticHeatingCalculator() {
  const [v, setV] = useState<number>(900);            // км/ч
  const [tAmbient, setTAmbient] = useState<number>(-50); // °C
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const vMs = v / 3.6;
    const dT = (vMs * vMs) / 2000;
    const tSkin = tAmbient + dT;
    return { dT, tSkin, vMs };
  }, [v, tAmbient, calculated]);

  // График: ΔT(V) и T_skin(V)
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { v: number; dT: number; tSkin: number }[] = [];
    for (let vv = 100; vv <= 3000; vv += 50) {
      const vMs = vv / 3.6;
      const dT = (vMs * vMs) / 2000;
      data.push({
        v: vv,
        dT: Number(dT.toFixed(1)),
        tSkin: Number((tAmbient + dT).toFixed(1)),
      });
    }
    return data;
  }, [tAmbient, calculated]);

  const vOk = v >= 100 && v <= 3000;
  const tOk = tAmbient >= -80 && tAmbient <= 40;
  const canCalc = vOk && tOk;

  // Вердикт по температуре обшивки
  const verdict = useMemo(() => {
    if (!result) return null;
    if (result.tSkin > 100) return { text: "⚠️ Критический нагрев — нужна теплозащита", color: "border-red-300 bg-red-50 text-red-800" };
    if (result.tSkin > 50) return { text: "⚠️ Сильный нагрев обшивки", color: "border-amber-300 bg-amber-50 text-amber-800" };
    return { text: "✅ Умеренный нагрев", color: "border-green-300 bg-green-50 text-green-800" };
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Скорость полёта V, км/ч
          </span>
          <input
            type="number"
            value={v}
            step={10}
            min={0}
            onChange={(e) => { setV(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!vOk && <span className="mt-1 block text-xs text-red-600">100…3000 км/ч</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Температура воздуха T_возд, °C
          </span>
          <input
            type="number"
            value={tAmbient}
            step={1}
            onChange={(e) => { setTAmbient(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!tOk && <span className="mt-1 block text-xs text-red-600">−80…+40 °C</span>}
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
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Скорость V, м/с</dt>
                <dd className="font-mono text-sm text-slate-900">{result.vMs.toFixed(1)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Кинетический нагрев ΔT, °C</dt>
                <dd className="font-mono text-sm font-semibold text-amber-700">
                  +{result.dT.toFixed(1)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Температура обшивки T_обш, °C
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.tSkin.toFixed(1)}
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
              Зависимость ΔT и T_обш от скорости
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              При T_возд = {tAmbient} °C. ΔT растёт как V².
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="v" type="number" domain={[100, 3000]}
                    ticks={[100, 500, 1000, 1500, 2000, 2500, 3000]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "V, км/ч", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "ΔT, °C / T_обш, °C", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number, name: string) => {
                      if (name === "dT") return [`+${value} °C`, "ΔT (нагрев)"];
                      if (name === "tSkin") return [`${value} °C`, "T_обш"];
                      return [value, name];
                    }}
                    labelFormatter={(v) => `V = ${v} км/ч`} />
                  <Legend wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => value === "dT" ? "ΔT (нагрев)" : value === "tSkin" ? "T_обшивки" : value} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                  <ReferenceLine x={v} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `V = ${v}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="dT" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="tSkin" stroke="#1d61d8" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: ΔT = V²/2000, где V в м/с. Эквивалентно ΔT = 5·(V/100)² для V
        в км/ч. При V = 900 км/ч (≈ 250 м/с) ΔT ≈ 31 °C. Для сверхзвуковых
        скоростей нагрев становится критическим (нужна теплозащита).
      </p>
    </div>
  );
}
