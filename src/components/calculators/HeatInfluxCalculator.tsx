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

const CP = 1005;
const R = 287.05;
const L = 2.5e6;

export function HeatInfluxCalculator() {
  const [T, setT] = useState<number>(20);
  const [p, setP] = useState<number>(1000);
  const [dT, setDT] = useState<number>(2);
  const [dp, setDp] = useState<number>(10);
  const [dsm, setDsm] = useState<number>(0.001);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const T_K = T + 273.15;
    const p_Pa = p * 100;
    const dp_Pa = dp * 100;
    const term1 = CP * dT;
    const term2 = -(R * T_K * dp_Pa) / p_Pa;
    const term3 = L * dsm;
    const dQ = term1 + term2 + term3;
    return { dQ, term1, term2, term3, T_K };
  }, [T, p, dT, dp, dsm, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { dT: number; s0: number; s1: number; s5: number; sn1: number }[] = [];
    const T_K = T + 273.15;
    const p_Pa = p * 100;
    const dp_Pa = dp * 100;
    const base = -(R * T_K * dp_Pa) / p_Pa;
    for (let d = -5; d <= 5; d += 0.5) {
      data.push({
        dT: d,
        s0: Number((CP * d + base + 0).toFixed(0)),
        s1: Number((CP * d + base + L * 0.001).toFixed(0)),
        s5: Number((CP * d + base + L * 0.005).toFixed(0)),
        sn1: Number((CP * d + base + L * -0.001).toFixed(0)),
      });
    }
    return data;
  }, [T, p, dp, calculated]);

  const tOk = T >= -60 && T <= 60;
  const pOk = p >= 300 && p <= 1050;
  const dTOk = dT >= -20 && dT <= 20;
  const dpOk = dp >= -100 && dp <= 100;
  const dsmOk = dsm >= -0.05 && dsm <= 0.05;
  const canCalc = tOk && pOk && dTOk && dpOk && dsmOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">T, °C</span>
          <input type="number" value={T} step={1}
            onChange={(e) => { setT(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!tOk && <span className="mt-1 block text-xs text-red-600">−60…+60 °C</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">p, гПа</span>
          <input type="number" value={p} step={10} min={0}
            onChange={(e) => { setP(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!pOk && <span className="mt-1 block text-xs text-red-600">300…1050 гПа</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">dT, К</span>
          <input type="number" value={dT} step={0.5}
            onChange={(e) => { setDT(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!dTOk && <span className="mt-1 block text-xs text-red-600">−20…+20 К</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">dp, гПа</span>
          <input type="number" value={dp} step={1}
            onChange={(e) => { setDp(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!dpOk && <span className="mt-1 block text-xs text-red-600">−100…+100 гПа</span>}
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">ds_m, кг/кг</span>
          <input type="number" value={dsm} step={0.0005}
            onChange={(e) => { setDsm(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!dsmOk && <span className="mt-1 block text-xs text-red-600">−0.05…+0.05 кг/кг</span>}
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
                <dt className="text-sm text-slate-600">c_p·dT</dt>
                <dd className="font-mono text-sm text-slate-900">{result.term1.toFixed(0)} Дж/кг</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">−RT·dp/p</dt>
                <dd className="font-mono text-sm text-slate-900">{result.term2.toFixed(0)} Дж/кг</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">L·ds_m</dt>
                <dd className="font-mono text-sm text-slate-900">{result.term3.toFixed(0)} Дж/кг</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600 font-semibold">dQ, Дж/кг</dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">{result.dQ.toFixed(0)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость dQ(dT)</h3>
            <p className="mt-1 text-sm text-slate-600">При разных ds_m.</p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dT" type="number" domain={[-5, 5]}
                    ticks={[-5, -3, -1, 0, 1, 3, 5]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "dT, К", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "dQ, Дж/кг", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value} Дж/кг`, "dQ"]}
                    labelFormatter={(d) => `dT = ${d} К`} />
                  <Legend wrapperStyle={{ fontSize: 12 }}
                    formatter={(value) => {
                      const labels: Record<string, string> = {
                        s0: "ds_m = 0", s1: "ds_m = +0.001", s5: "ds_m = +0.005", sn1: "ds_m = −0.001"
                      };
                      return labels[value] ?? value;
                    }} />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />
                  <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="4 4" />
                  <ReferenceLine x={dT} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `dT = ${dT}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="s0" stroke="#94a3b8" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="s1" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="s5" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="sn1" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: dQ = c_p·dT − RT·dp/p + L·ds_m. При dQ = 0 (адиабата):
        c_p·dT = RT·dp/p → T/T₀ = (p/p₀)^(R/c_p).
      </p>
    </div>
  );
}
