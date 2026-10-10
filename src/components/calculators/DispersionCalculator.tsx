"use client";

import { useState } from "react";

// --- Аппроксимации Паскуилла-Гиффорда для σy и σz (x в метрах) ---
// Источник: Turner (1970), Briggs (1973)
type StabilityClass = "A" | "B" | "C" | "D" | "E" | "F";

function sigmaY(cls: StabilityClass, x: number): number {
  // σy = a · x^0.894 (x в метрах, σy в метрах)
  const a: Record<StabilityClass, number> = {
    A: 0.22, B: 0.16, C: 0.11, D: 0.08, E: 0.06, F: 0.04
  };
  return a[cls] * Math.pow(x, 0.894);
}

function sigmaZ(cls: StabilityClass, x: number): number {
  // σz — разные формулы для разных классов
  switch (cls) {
    case "A": return 0.20 * x;
    case "B": return 0.12 * x;
    case "C": return 0.08 * x / Math.sqrt(1 + 0.0002 * x);
    case "D": return 0.06 * x / Math.sqrt(1 + 0.0015 * x);
    case "E": return 0.03 * x / (1 + 0.0003 * x);
    case "F": return 0.016 * x / (1 + 0.0003 * x);
  }
}

// Приземная концентрация C(x) в кг/м³ (z = 0, y = 0)
function groundConcentration(
  Q: number, u: number, H: number, x: number, cls: StabilityClass
): number {
  const sy = sigmaY(cls, x);
  const sz = sigmaZ(cls, x);
  if (sy <= 0 || sz <= 0 || u <= 0) return 0;
  return (Q / (Math.PI * u * sy * sz)) * Math.exp(-(H * H) / (2 * sz * sz));
}

// Найти x_max и C_max численно
function findMax(
  Q: number, u: number, H: number, cls: StabilityClass
): { xMax: number; cMax: number } {
  let cMax = 0;
  let xMax = 0;
  for (let x = 10; x <= 20000; x += 10) {
    const c = groundConcentration(Q, u, H, x, cls);
    if (c > cMax) {
      cMax = c;
      xMax = x;
    }
  }
  return { xMax, cMax };
}

export default function DispersionCalculator() {
  const [Q, setQ] = useState<number>(10);      // г/с
  const [u, setU] = useState<number>(3);       // м/с
  const [H, setH] = useState<number>(50);      // м
  const [x, setX] = useState<number>(1000);    // м
  const [cls, setCls] = useState<StabilityClass>("D");

  // Перевод Q из г/с в кг/с
  const Qk = Q / 1000;

  const sy = sigmaY(cls, x);
  const sz = sigmaZ(cls, x);
  const c = groundConcentration(Qk, u, H, x, cls);
  const { xMax, cMax } = findMax(Qk, u, H, cls);

  // Проверки диапазонов
  const qOk = Q > 0 && Q <= 10000;
  const uOk = u > 0 && u <= 30;
  const hOk = H >= 0 && H <= 500;
  const xOk = x > 0 && x <= 50000;

  // Перевод кг/м³ в мкг/м³ (× 10⁹)
  const cUgm3 = c * 1e9;
  const cMaxUgm3 = cMax * 1e9;

  return (
    <div className="space-y-6">
      {/* Входные параметры */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Мощность источника Q, г/с
          </span>
          <input
            type="number"
            value={Q}
            step={0.1}
            min={0}
            onChange={(e) => setQ(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {!qOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 0…10000 г/с</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Скорость ветра u, м/с
          </span>
          <input
            type="number"
            value={u}
            step={0.1}
            min={0.1}
            onChange={(e) => setU(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {!uOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 0.1…30 м/с</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Высота источника H, м
          </span>
          <input
            type="number"
            value={H}
            step={1}
            min={0}
            onChange={(e) => setH(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {!hOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 0…500 м</span>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Расстояние x, м
          </span>
          <input
            type="number"
            value={x}
            step={10}
            min={10}
            onChange={(e) => setX(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {!xOk && <span className="mt-1 block text-xs text-red-600">Диапазон: 10…50000 м</span>}
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Класс устойчивости (Паскуилл)
          </span>
          <select
            value={cls}
            onChange={(e) => setCls(e.target.value as StabilityClass)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="A">A — очень неустойчивая</option>
            <option value="B">B — неустойчивая</option>
            <option value="C">C — слабо неустойчивая</option>
            <option value="D">D — нейтральная</option>
            <option value="E">E — слабо устойчивая</option>
            <option value="F">F — устойчивая</option>
          </select>
        </label>
      </div>

      {/* Результаты */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">Результаты</h3>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">σ_y (при x)</dt>
            <dd className="font-mono text-sm text-slate-900">{sy.toFixed(1)} м</dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">σ_z (при x)</dt>
            <dd className="font-mono text-sm text-slate-900">{sz.toFixed(1)} м</dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">C (при x, y=0, z=0)</dt>
            <dd className="font-mono text-sm font-semibold text-sky-700">{cUgm3.toFixed(2)} мкг/м³</dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">C_max (максимум)</dt>
            <dd className="font-mono text-sm text-slate-900">{cMaxUgm3.toFixed(2)} мкг/м³</dd>
          </div>
          <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
            <dt className="text-sm text-slate-600">x_max (расстояние до C_max)</dt>
            <dd className="font-mono text-sm text-slate-900">{xMax.toFixed(0)} м</dd>
          </div>
        </dl>
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        Формулы: гауссова модель факела, аппроксимации σ_y(x) и σ_z(x) по Паскуиллу-Гиффорду
        (Turner, 1970). Q — мощность источника, u — скорость ветра, H — высота источника,
        x — расстояние по ветру. Приземная концентрация (z = 0, y = 0) с учётом отражения
        от подстилающей поверхности: C = Q / (π·u·σ_y·σ_z) · exp(−H²/(2σ_z²)).
      </p>
    </div>
  );
}