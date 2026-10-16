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

export function AircraftCeilingCalculator() {
  const [hStd, setHStd] = useState<number>(11000);   // H_пот,са, м
  const [p0, setP0] = useState<number>(750);          // p₀, мм рт. ст.
  const [tTropoReal, setTTropoReal] = useState<number>(-60);  // T_трп,ф, °C
  const [tTropoStd, setTTropoStd] = useState<number>(-56.5);  // T_трп,са, °C
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const deltaP = (760 - p0) * 10;
    const deltaT = (tTropoReal - tTropoStd) * 80;
    const hReal = hStd - deltaP - deltaT;
    return { hReal, deltaP, deltaT };
  }, [hStd, p0, tTropoReal, tTropoStd, calculated]);

  // График: H_пот(p0)
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { p0: number; h: number }[] = [];
    for (let p = 700; p <= 790; p += 5) {
      const deltaP = (760 - p) * 10;
      const deltaT = (tTropoReal - tTropoStd) * 80;
      data.push({ p0: p, h: Number((hStd - deltaP - deltaT).toFixed(0)) });
    }
    return data;
  }, [hStd, tTropoReal, tTropoStd, calculated]);

  const hStdOk = hStd >= 1000 && hStd <= 20000;
  const p0Ok = p0 >= 600 && p0 <= 800;
  const tRealOk = tTropoReal >= -90 && tTropoReal <= 20;
  const tStdOk = tTropoStd >= -90 && tTropoStd <= 20;
  const canCalc = hStdOk && p0Ok && tRealOk && tStdOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Стандартный потолок H_пот,са, м
          </span>
          <input
            type="number"
            value={hStd}
            step={100}
            min={0}
            onChange={(e) => { setHStd(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!hStdOk && <span className="mt-1 block text-xs text-red-600">1000…20000 м</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Давление на аэродроме p₀, мм рт. ст.
          </span>
          <input
            type="number"
            value={p0}
            step={1}
            min={0}
            onChange={(e) => { setP0(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!p0Ok && <span className="mt-1 block text-xs text-red-600">600…800 мм рт. ст.</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            T_трп,ф — факт. темп. тропопаузы, °C
          </span>
          <input
            type="number"
            value={tTropoReal}
            step={0.5}
            onChange={(e) => { setTTropoReal(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!tRealOk && <span className="mt-1 block text-xs text-red-600">−90…+20 °C</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            T_трп,са — станд. темп. тропопаузы, °C
          </span>
          <input
            type="number"
            value={tTropoStd}
            step={0.5}
            onChange={(e) => { setTTropoStd(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!tStdOk && <span className="mt-1 block text-xs text-red-600">−90…+20 °C</span>}
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setCalculated(true)}
          disabled={!canCalc}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium text-white transition",
            !canCalc
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
                <dt className="text-sm text-slate-600">Поправка на давление, м</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {result.deltaP >= 0 ? "+" : ""}{result.deltaP.toFixed(0)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Поправка на температуру, м</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {result.deltaT >= 0 ? "+" : ""}{result.deltaT.toFixed(0)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Фактический потолок H_пот,ф, м
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.hReal.toFixed(0)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Зависимость H_пот,ф от давления на аэродроме
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              При H_пот,са = {hStd} м и T_трп,ф − T_трп,са = {(tTropoReal - tTropoStd).toFixed(1)} °C.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="p0" type="number" domain={[700, 790]}
                    ticks={[700, 720, 740, 760, 780, 790]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "p₀, мм рт. ст.", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "H_пот,ф, м", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value} м`, "H_пот,ф"]}
                    labelFormatter={(p) => `p₀ = ${p} мм рт. ст.`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine x={760} stroke="#94a3b8" strokeDasharray="4 4"
                    label={{ value: "760 (станд.)", fontSize: 11, fill: "#64748b", position: "top" }} />
                  <ReferenceLine x={p0} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `p₀ = ${p0}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="h" name="H_пот,ф" stroke="#1d61d8" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: H_пот,ф = H_пот,са − (760 − p₀)·10 − (T_трп,ф − T_трп,са)·80.
        p₀ — давление на аэродроме (мм рт. ст.), T_трп — температура тропопаузы.
        При пониженном давлении (высокогорье) и повышенной температуре потолок
        снижается.
      </p>
    </div>
  );
}
