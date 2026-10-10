"use client";

import { useState } from "react";

// Дисперсия воды (формула Коши, упрощённая), λ в нм → n
// n(λ) ≈ 1.3199 + 6878/λ² − 1.132·10⁹/λ⁴
function waterN(lambdaNm: number): number {
  return 1.3199 + 6878 / (lambdaNm * lambdaNm) - 1.132e9 / Math.pow(lambdaNm, 4);
}

// Угол главной радуги (1 отражение): cos θ = (n² − 1) / (n² + 1)
function primaryAngleDeg(n: number): number {
  const cosT = (n * n - 1) / (n * n + 1);
  return (Math.acos(cosT) * 180) / Math.PI;
}

// Угол вторичной радуги (2 отражения): cos θ = √((9 − n²) / 8)
function secondaryAngleDeg(n: number): number {
  const arg = (9 - n * n) / 8;
  if (arg < 0) return NaN;
  return (Math.acos(Math.sqrt(arg)) * 180) / Math.PI;
}

// Соответствие длин волн и цветов
const wavelengths = [
  { nm: 400, color: "Фиолетовый" },
  { nm: 450, color: "Синий" },
  { nm: 480, color: "Голубой" },
  { nm: 510, color: "Зелёный" },
  { nm: 550, color: "Жёлто-зелёный" },
  { nm: 580, color: "Жёлтый" },
  { nm: 610, color: "Оранжевый" },
  { nm: 650, color: "Красный" },
  { nm: 700, color: "Тёмно-красный" }
];

export default function RainbowCalculator() {
  const [lambdaNm, setLambdaNm] = useState<number>(550);

  const n = waterN(lambdaNm);
  const thetaPrimary = primaryAngleDeg(n);
  const thetaSecondary = secondaryAngleDeg(n);

  // Проверки диапазонов
  const lambdaOk = lambdaNm >= 380 && lambdaNm <= 750;

  // Таблица дисперсии
  const table = wavelengths.map((w) => {
    const ni = waterN(w.nm);
    return {
      ...w,
      n: ni,
      theta: primaryAngleDeg(ni)
    };
  });

  return (
    <div className="space-y-6">
      {/* Вход */}
      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Длина волны λ, нм (380–750)
        </span>
        <input
          type="number"
          value={lambdaNm}
          step={5}
          min={380}
          max={750}
          onChange={(e) => setLambdaNm(Number(e.target.value))}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                     focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        {!lambdaOk && (
          <span className="mt-1 block text-xs text-red-600">
            Диапазон: 380…750 нм
          </span>
        )}
      </label>

      {/* Результаты */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">Результаты</h3>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">n (при λ)</dt>
            <dd className="font-mono text-sm text-slate-900">{n.toFixed(5)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <dt className="text-sm text-slate-600">θ главной радуги</dt>
            <dd className="font-mono text-sm font-semibold text-sky-700">
              {thetaPrimary.toFixed(2)}°
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
            <dt className="text-sm text-slate-600">θ вторичной радуги</dt>
            <dd className="font-mono text-sm text-slate-900">
              {isNaN(thetaSecondary) ? "—" : `${thetaSecondary.toFixed(2)}°`}
            </dd>
          </div>
        </dl>
      </div>

      {/* Таблица дисперсии */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          Дисперсия: зависимость от длины волны
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2">λ, нм</th>
              <th className="py-2">Цвет</th>
              <th className="py-2 text-right">n</th>
              <th className="py-2 text-right">θ главной</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.nm} className="border-b border-slate-100">
                <td className="py-1.5 font-mono text-slate-700">{row.nm}</td>
                <td className="py-1.5 text-slate-700">{row.color}</td>
                <td className="py-1.5 text-right font-mono text-slate-700">
                  {row.n.toFixed(5)}
                </td>
                <td className="py-1.5 text-right font-mono text-sky-700">
                  {row.theta.toFixed(2)}°
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        Формулы: угол главной радуги cos θ = (n² − 1) / (n² + 1), вторичной —
        cos θ = √((9 − n²) / 8). Показатель преломления воды n(λ) — по формуле
        Коши (упрощённая). Дисперсия объясняет, почему красный цвет радуги
        снаружи (θ ≈ 42.4°), а фиолетовый внутри (θ ≈ 40.6°).
      </p>
    </div>
  );
}