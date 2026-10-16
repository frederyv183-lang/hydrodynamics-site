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

const RHO_ICE = 900; // кг/м³ — плотность льда

type Severity = "light" | "moderate" | "severe";

export function IcingIntensityCalculator() {
  const [v, setV] = useState<number>(400);          // км/ч
  const [w, setW] = useState<number>(0.5);          // г/м³ — водность
  const [capture, setCapture] = useState<number>(0.5); // Δy/Δl — коэффициент захвата
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const vMs = v / 3.6;
    const wKg = w / 1000; // г/м³ → кг/м³
    // I — толщина льда в м/с
    const iMps = (vMs * wKg * capture) / RHO_ICE;
    const iMmPerMin = iMps * 1000 * 60; // мм/мин
    return { iMmPerMin, vMs, wKg };
  }, [v, w, capture, calculated]);

  // График: I(V) при разных водностях
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { v: number; w02: number; w05: number; w10: number; w20: number }[] = [];
    for (let vv = 100; vv <= 900; vv += 25) {
      const vMs = vv / 3.6;
      const build = (ww: number) => {
        const wKg = ww / 1000;
        return Number((((vMs * wKg * capture) / RHO_ICE) * 1000 * 60).toFixed(3));
      };
      data.push({
        v: vv,
        w02: build(0.2),
        w05: build(0.5),
        w10: build(1.0),
        w20: build(2.0),
      });
    }
    return data;
  }, [capture, calculated]);

  const vOk = v >= 100 && v <= 900;
  const wOk = w >= 0.1 && w <= 3;
  const capOk = capture >= 0.05 && capture <= 1;
  const canCalc = vOk && wOk && capOk;

  const severity: Severity | null = useMemo(() => {
    if (!result) return null;
    if (result.iMmPerMin < 0.5) return "light";
    if (result.iMmPerMin < 1.5) return "moderate";
    return "severe";
  }, [result]);

  const severityText: Record<Severity, { text: string; color: string }> = {
    light: { text: "Слабое обледенение — эпизодическое, не опасно", color: "border-green-300 bg-green-50 text-green-800" },
    moderate: { text: "⚠️ Умеренное обледенение — необходимо включить ПОС (противообледенительную систему)", color: "border-amber-300 bg-amber-50 text-amber-800" },
    severe: { text: "⚠️ Сильное обледенение — опасно для полёта, требуется немедленный уход из зоны", color: "border-red-300 bg-red-50 text-red-800" },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Скорость V, км/ч
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
          {!vOk && <span className="mt-1 block text-xs text-red-600">100…900 км/ч</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Водность w, г/м³
          </span>
          <input
            type="number"
            value={w}
            step={0.05}
            min={0}
            onChange={(e) => { setW(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!wOk && <span className="mt-1 block text-xs text-red-600">0.1…3 г/м³</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Коэффициент захвата Δy/Δl
          </span>
          <input
            type="number"
            value={capture}
            step={0.05}
            min={0}
            max={1}
            onChange={(e) => { setCapture(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!capOk && <span className="mt-1 block text-xs text-red-600">0.05…1</span>}
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
                <dt className="text-sm text-slate-600">Водность w, кг/м³</dt>
                <dd className="font-mono text-sm text-slate-900">{result.wKg.toFixed(5)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Интенсивность обледенения I, мм/мин
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.iMmPerMin.toFixed(3)}
                </dd>
              </div>
            </dl>
          </div>

          {severity && (
            <div className={cn("rounded-lg border p-3 text-sm", severityText[severity].color)}>
              {severityText[severity].text}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Зависимость I от скорости
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              При коэффициенте захвата Δy/Δl = {capture} и разных водностях.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="v" type="number" domain={[100, 900]}
                    ticks={[100, 200, 300, 400, 500, 600, 700, 800, 900]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "V, км/ч", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "I, мм/мин", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(3)} мм/мин`, "I"]}
                    labelFormatter={(v) => `V = ${v} км/ч`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine y={0.5} stroke="#22c55e" strokeDasharray="4 4"
                    label={{ value: "0.5 (умер.)", fontSize: 11, fill: "#16a34a", position: "insideTopRight" }} />
                  <ReferenceLine y={1.5} stroke="#ef4444" strokeDasharray="4 4"
                    label={{ value: "1.5 (сильн.)", fontSize: 11, fill: "#dc2626", position: "insideTopRight" }} />
                  <ReferenceLine x={v} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `V = ${v}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="w02" name="w = 0.2 г/м³" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="w05" name="w = 0.5 г/м³" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="w10" name="w = 1.0 г/м³" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="w20" name="w = 2.0 г/м³" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: I = (V·w/ρ_л)·(Δy/Δl). V — скорость (м/с), w — водность
        облака (кг/м³), ρ_л = 900 кг/м³ — плотность льда, Δy/Δl — доля
        переохлаждённых капель, оседающих на обшивке. По классификации:
        I &lt; 0.5 мм/мин — слабое, 0.5…1.5 — умеренное, &gt; 1.5 — сильное
        обледенение.
      </p>
    </div>
  );
}
