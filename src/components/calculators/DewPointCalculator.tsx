"use client";

import { useState } from "react";

// Упругость насыщения над водой (Магнус), T в °C, E в гПа
function eWater(T: number): number {
  return 6.112 * Math.exp((17.67 * T) / (T + 243.5));
}

// Точка росы по фактической упругости пара E (гПа)
function dewPoint(E: number): number {
  const ln = Math.log(E / 6.112);
  return (243.5 * ln) / (17.67 - ln);
}

export default function DewPointCalculator() {
  const [T, setT] = useState<number>(20);
  const [RH, setRH] = useState<number>(50);

  const Es = eWater(T);
  const E = (RH / 100) * Es;
  const Td = dewPoint(E);
  const deficit = T - Td;

  // Проверки диапазонов
  const tOk = T >= -50 && T <= 60;
  const rhOk = RH >= 0 && RH <= 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Температура T, °C
          </span>
          <input
            type="number"
            value={T}
            step={0.1}
            onChange={(e) => setT(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {!tOk && (
            <span className="mt-1 block text-xs text-red-600">
              Диапазон: −50…+60 °C
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Относительная влажность RH, %
          </span>
          <input
            type="number"
            value={RH}
            step={1}
            min={0}
            max={100}
            onChange={(e) => setRH(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {!rhOk && (
            <span className="mt-1 block text-xs text-red-600">
              Диапазон: 0…100 %
            </span>
          )}
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          Результаты
        </h3>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">E_s (насыщение)</dt>
            <dd className="font-mono text-sm text-slate-900">
              {Es.toFixed(2)} гПа
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">E (фактическая)</dt>
            <dd className="font-mono text-sm text-slate-900">
              {E.toFixed(2)} гПа
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">Точка росы T_d</dt>
            <dd className="font-mono text-sm font-semibold text-sky-700">
              {Td.toFixed(2)} °C
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">Дефицит T − T_d</dt>
            <dd className="font-mono text-sm text-slate-900">
              {deficit.toFixed(2)} °C
            </dd>
          </div>
        </dl>
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        Формулы: Магнуса для E_s(T) и обратная Магнуса для T_d(E).{" "}
        При RH = 100 % точка росы совпадает с температурой воздуха, дефицит равен нулю.
      </p>
    </div>
  );
}