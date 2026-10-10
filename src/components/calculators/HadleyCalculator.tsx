"use client";

import { useMemo, useState } from "react";

const G = 9.80665;          // м/с^2
const OMEGA = 7.2921e-5;    // с^-1 — угловая скорость Земли
const A = 6.371e6;          // м — радиус Земли

export default function HadleyCalculator() {
  const [dT, setDT] = useState<number>(40);   // K — контраст экватор-полюс
  const [H_km, setH_km] = useState<number>(14); // км — высота тропопаузы
  const [T0, setT0] = useState<number>(255);  // K — средняя температура

  const result = useMemo(() => {
    const H = H_km * 1000; // км → м
    const numerator = G * H * dT;
    const denominator = OMEGA * OMEGA * A * A * T0;
    const ratio = numerator / denominator;
    const phiRad = Math.pow(ratio, 0.25);
    const phiDeg = (phiRad * 180) / Math.PI;
    return { phiRad, phiDeg, numerator, denominator, ratio };
  }, [dT, H_km, T0]);

  let verdict = "close";
  if (result.phiDeg < 20) verdict = "low";
  else if (result.phiDeg > 40) verdict = "high";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* ΔT */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            ΔT = <span className="font-semibold text-brand-700">{dT} K</span>
          </label>
          <input
            type="range"
            min={20}
            max={80}
            step={1}
            value={dT}
            onChange={(e) => setDT(Number(e.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>20 K</span>
            <span>80 K</span>
          </div>
        </div>

        {/* H */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            H = <span className="font-semibold text-brand-700">{H_km} км</span>
          </label>
          <input
            type="range"
            min={10}
            max={18}
            step={0.5}
            value={H_km}
            onChange={(e) => setH_km(Number(e.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>10 км</span>
            <span>18 км</span>
          </div>
        </div>

        {/* T0 */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            T₀ = <span className="font-semibold text-brand-700">{T0} K</span>
          </label>
          <input
            type="range"
            min={240}
            max={300}
            step={1}
            value={T0}
            onChange={(e) => setT0(Number(e.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>240 K</span>
            <span>300 K</span>
          </div>
        </div>
      </div>

      {/* Результат */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Ширина ячейки Хэдли
        </h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-3xl font-bold text-brand-700">
              {result.phiDeg.toFixed(2)} <span className="text-lg font-medium">°</span>
            </div>
            <div className="text-sm text-slate-600">
              = {result.phiRad.toFixed(4)} рад
            </div>
          </div>
          <div className="text-sm text-slate-600">
            <div>числитель: {result.numerator.toExponential(3)}</div>
            <div>знаменатель: {result.denominator.toExponential(3)}</div>
            <div>отношение: {result.ratio.toExponential(3)}</div>
          </div>
        </div>

        <div
          className={
            "mt-4 rounded-lg border p-3 text-sm " +
            (verdict === "close"
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-amber-300 bg-amber-50 text-amber-800")
          }
        >
          {verdict === "close" && (
            <>✅ Близко к наблюдениям (φ_H ≈ 30°). Формула Хельда–Хоу корректно описывает ширину ячейки Хэдли для современной Земли.</>
          )}
          {verdict === "low" && (
            <>⚠️ Ширина &lt; 20° — приземная ячейка узкая. Это возможно при малом контрасте ΔT или высокой T₀. В реальности такого режима на Земле нет.</>
          )}
          {verdict === "high" && (
            <>⚠️ Ширина &gt; 40° — ячейка расширяется к полюсам. Это возможно при большом ΔT или низкой T₀. Может соответствовать ледниковым эпохам.</>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Формула Хельда–Хоу: φ_H ≈ (g·H·ΔT / (Ω²·a²·T₀))<sup>1/4</sup>.
          При ΔT = 40 K, H = 14 км, T₀ = 255 K получаем φ_H ≈ 30°.
        </p>
      </div>
    </div>
  );
}