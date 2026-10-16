"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid, Legend, Line, LineChart, ReferenceLine,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { cn } from "@/lib/cn";

const G = 9.80665;
const R_AIR = 287.05;

type RhoMode = "direct" | "calc";

export function TakeoffSpeedCalculator() {
  const [mass, setMass] = useState<number>(75000);
  const [wingArea, setWingArea] = useState<number>(150);
  const [cy, setCy] = useState<number>(1.2);
  const [rhoMode, setRhoMode] = useState<RhoMode>("direct");
  const [rho, setRho] = useState<number>(1.225);
  const [temp, setTemp] = useState<number>(15);
  const [pressure, setPressure] = useState<number>(1013);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const T_K = temp + 273.15;
    const p_Pa = pressure * 100;
    const rhoActual = rhoMode === "direct" ? rho : p_Pa / (R_AIR * T_K);
    if (rhoActual <= 0 || cy <= 0 || wingArea <= 0 || mass <= 0) {
      return { rhoActual: 0, v: 0, vKmh: 0 };
    }
    const v = Math.sqrt((2 * mass * G) / (cy * wingArea * rhoActual));
    return { rhoActual, v, vKmh: v * 3.6 };
  }, [mass, wingArea, cy, rho, temp, pressure, rhoMode, calculated]);

  const chartData = useMemo(() => {
    if (!calculated) return [];
    const data: { t: number; v: number }[] = [];
    for (let t = -40; t <= 50; t += 2) {
      const T_K = t + 273.15;
      const p_Pa = pressure * 100;
      const rhoT = rhoMode === "direct" ? rho : p_Pa / (R_AIR * T_K);
      if (rhoT <= 0 || cy <= 0 || wingArea <= 0 || mass <= 0) {
        data.push({ t, v: 0 });
        continue;
      }
      const v = Math.sqrt((2 * mass * G) / (cy * wingArea * rhoT));
      data.push({ t, v: Number(v.toFixed(2)) });
    }
    return data;
  }, [mass, wingArea, cy, rho, pressure, rhoMode, calculated]);

  const massOk = mass > 0 && mass <= 500000;
  const wingOk = wingArea > 0 && wingArea <= 1000;
  const cyOk = cy > 0 && cy <= 3;
  const rhoOk = rhoMode === "direct" ? rho > 0 && rho <= 2 : true;
  const tempOk = temp >= -60 && temp <= 60;
  const pressOk = pressure >= 500 && pressure <= 1100;
  const canCalc = massOk && wingOk && cyOk && rhoOk && tempOk && pressOk;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { setRhoMode("direct"); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            rhoMode === "direct" ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          Ввести ρ напрямую
        </button>
        <button type="button" onClick={() => { setRhoMode("calc"); markDirty(); }}
          className={cn("rounded-md border px-3 py-1.5 text-sm transition",
            rhoMode === "calc" ? "border-brand-500 bg-brand-50 text-brand-800"
              : "border-slate-300 text-slate-600 hover:border-slate-400")}>
          Рассчитать ρ из T и p
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Масса G, кг</span>
          <input type="number" value={mass} step={500} min={0}
            onChange={(e) => { setMass(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!massOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 0…500000 кг</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Площадь крыла S, м²</span>
          <input type="number" value={wingArea} step={1} min={0}
            onChange={(e) => { setWingArea(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!wingOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 0…1000 м²</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Коэффициент c_y</span>
          <input type="number" value={cy} step={0.05} min={0}
            onChange={(e) => { setCy(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!cyOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 0…3</span>}
        </label>

        {rhoMode === "direct" ? (
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Плотность ρ, кг/м³</span>
            <input type="number" value={rho} step={0.001} min={0}
              onChange={(e) => { setRho(Number(e.target.value)); markDirty(); }}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
            {!rhoOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 0…2 кг/м³</span>}
          </label>
        ) : (
          <>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Температура T, °C</span>
              <input type="number" value={temp} step={1}
                onChange={(e) => { setTemp(Number(e.target.value)); markDirty(); }}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
              {!tempOk && <span className="mt-1 block text-xs text-red-600">−60…+60 °C</span>}
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Давление p, гПа</span>
              <input type="number" value={pressure} step={1} min={0}
                onChange={(e) => { setPressure(Number(e.target.value)); markDirty(); }}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
              {!pressOk && <span className="mt-1 block text-xs text-red-600">500…1100 гПа</span>}
            </label>
          </>
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
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Плотность ρ, кг/м³</dt>
                <dd className="font-mono text-sm text-slate-900">{result.rhoActual.toFixed(4)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Скорость V, м/с</dt>
                <dd className="font-mono text-sm font-semibold text-brand-700">{result.v.toFixed(2)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600">Скорость V, км/ч</dt>
                <dd className="font-mono text-sm font-semibold text-brand-700">{result.vKmh.toFixed(1)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость V_отр от температуры</h3>
            <p className="mt-1 text-sm text-slate-600">
              При G = {mass} кг, S = {wingArea} м², c_y = {cy}
              {rhoMode === "calc" ? `, p = ${pressure} гПа` : `, ρ = ${rho} кг/м³`}.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="t" type="number" domain={[-40, 50]}
                    ticks={[-40, -20, 0, 20, 40, 50]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "Температура T, °C", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "V_отр, м/с", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(2)} м/с`, "V_отр"]}
                    labelFormatter={(t) => `T = ${t} °C`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {rhoMode === "calc" ? (
                    <ReferenceLine x={temp} stroke="#1d61d8" strokeDasharray="4 4"
                      label={{ value: `T = ${temp} °C`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  ) : null}
                  <Line type="monotone" dataKey="v" name="Скорость отрыва" stroke="#1d61d8" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: V_отр = √(2G / (c_y · S · ρ)). С ростом температуры плотность
        воздуха падает (ρ = p / (R·T)), поэтому скорость отрыва растёт.
      </p>
    </div>
  );
}
