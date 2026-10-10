"use client";

import { useMemo, useState } from "react";

const G = 9.80665;          // м/с^2
const RHO_W = 1000;         // кг/м^3 — плотность воды
const P_STD = 101325;       // Па
const R_AIR = 287.05;       // Дж/(кг·К)
const ETA_0 = 1.716e-5;     // Па·с при T0 = 273.15 K
const T0 = 273.15;          // K
const SUTHERLAND = 110.4;   // K

// Вязкость воздуха по формуле Сазерленда
function airViscosity(T_K: number): number {
  return ETA_0 * Math.pow(T_K / T0, 1.5) * ((T0 + SUTHERLAND) / (T_K + SUTHERLAND));
}

// Плотность воздуха из уравнения состояния (p = const)
function airDensity(T_K: number): number {
  return P_STD / (R_AIR * T_K);
}

export default function StokesCalculator() {
  const [r_mkm, setR_mkm] = useState<number>(10);
  const [t_C, setT_C] = useState<number>(20);

  const result = useMemo(() => {
    const T_K = t_C + 273.15;
    const r = r_mkm * 1e-6;               // мкм → м
    const eta = airViscosity(T_K);        // Па·с
    const rhoA = airDensity(T_K);         // кг/м^3
    const nu = eta / rhoA;                // кинематическая вязкость, м^2/с

    // Закон Стокса
    const v = (2 * r * r * (RHO_W - rhoA) * G) / (9 * eta);
    // Число Рейнольдса для капли
    const Re = (v * r) / nu;

    return { v, Re, eta, rhoA, nu, T_K };
  }, [r_mkm, t_C]);

  const stokesApplicable = result.Re < 1;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Радиус */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Радиус капли r = <span className="font-semibold text-brand-700">{r_mkm} мкм</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={r_mkm}
            onChange={(e) => setR_mkm(Number(e.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>1 мкм</span>
            <span>100 мкм</span>
          </div>
        </div>

        {/* Температура */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Температура T = <span className="font-semibold text-brand-700">{t_C} °C</span>
          </label>
          <input
            type="range"
            min={-20}
            max={40}
            step={1}
            value={t_C}
            onChange={(e) => setT_C(Number(e.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>−20 °C</span>
            <span>+40 °C</span>
          </div>
        </div>
      </div>

      {/* Результат */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Скорость падения
        </h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-3xl font-bold text-brand-700">
              {result.v.toFixed(4)} <span className="text-lg font-medium">м/с</span>
            </div>
            <div className="text-sm text-slate-600">
              = {(result.v * 100).toFixed(2)} см/с
            </div>
          </div>
          <div className="text-sm text-slate-600">
            <div>η(T) = {result.eta.toExponential(3)} Па·с</div>
            <div>ρ_возд = {result.rhoA.toFixed(3)} кг/м³</div>
            <div>ν = {result.nu.toExponential(3)} м²/с</div>
            <div>Re = {result.Re.toFixed(3)}</div>
          </div>
        </div>

        <div
          className={
            "mt-4 rounded-lg border p-3 text-sm " +
            (stokesApplicable
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-amber-300 bg-amber-50 text-amber-800")
          }
        >
          {stokesApplicable ? (
            <>
              ✅ Закон Стокса применим (Re &lt; 1). Формула даёт корректную оценку
              скорости падения.
            </>
          ) : (
            <>
              ⚠️ Re &gt; 1 — закон Стокса неприменим. Реальная скорость падения
              <strong> ниже</strong> рассчитанной (сопротивление воздуха квадратичное).
              Для капель r &gt; 40 мкм используйте эмпирические формулы или
              квадратичный закон сопротивления.
            </>
          )}
        </div>
      </div>
    </div>
  );
}