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

const G = 9.80665;
const CP = 1005;      // Дж/(кг·К)
const L = 2.5e6;      // Дж/кг
const EPS = 0.622;
const RD = 287.05;    // Дж/(кг·К)
const GAMMA_A = 0.98; // °C/100 м

// Упругость насыщения над водой (Магнус), T в °C, E в гПа
function eWater(T: number): number {
  return 6.112 * Math.exp((17.67 * T) / (T + 243.5));
}

// Влажноадиабатический градиент, °C/100 м
// T в °C, p в гПа
function moistGradient(T: number, p: number): number {
  const T_K = T + 273.15;
  const p_Pa = p * 100;
  const Es_Pa = eWater(T) * 100; // гПа → Па
  const num = 1 + (L * Es_Pa) / (RD * T_K * p_Pa);
  const den = 1 + (L * L * Es_Pa * EPS) / (CP * RD * T_K * T_K * p_Pa);
  return GAMMA_A * (num / den);
}

export function MoistAdiabatCalculator() {
  const [T, setT] = useState<number>(20);       // °C
  const [p, setP] = useState<number>(1000);     // гПа
  const [calculated, setCalculated] = useState<boolean>(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const gamma = moistGradient(T, p);
    const Es = eWater(T);
    return { gamma, Es };
  }, [T, p, calculated]);

  // Данные для графика: γ'(T) при разных давлениях
  const chartData = useMemo(() => {
    const data: { T: number; p1000: number; p850: number; p700: number; p500: number }[] = [];
    for (let t = -30; t <= 40; t += 1) {
      data.push({
        T: t,
        p1000: Number(moistGradient(t, 1000).toFixed(3)),
        p850: Number(moistGradient(t, 850).toFixed(3)),
        p700: Number(moistGradient(t, 700).toFixed(3)),
        p500: Number(moistGradient(t, 500).toFixed(3)),
      });
    }
    return data;
  }, []);

  const tOk = T >= -50 && T <= 50;
  const pOk = p >= 500 && p <= 1050;

  return (
    <div className="space-y-6">
      {/* Поля ввода */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Температура T, °C
          </span>
          <input
            type="number"
            value={T}
            step={0.1}
            onChange={(e) => { setT(Number(e.target.value)); setCalculated(false); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!tOk && (
            <span className="mt-1 block text-xs text-red-600">
              Диапазон: −50…+50 °C
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Давление p, гПа
          </span>
          <input
            type="number"
            value={p}
            step={10}
            min={0}
            onChange={(e) => { setP(Number(e.target.value)); setCalculated(false); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm
                       focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          {!pOk && (
            <span className="mt-1 block text-xs text-red-600">
              Диапазон: 500…1050 гПа
            </span>
          )}
        </label>
      </div>

      {/* Кнопка */}
      <div>
        <button
          type="button"
          onClick={() => setCalculated(true)}
          disabled={!tOk || !pOk}
          className={cn(
            "rounded-md px-4 py-2 text-sm font-medium text-white transition",
            !tOk || !pOk
              ? "cursor-not-allowed bg-slate-300"
              : "bg-brand-600 hover:bg-brand-700"
          )}
        >
          Рассчитать
        </button>
      </div>

      {/* Результат */}
      {result && (
        <>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Результаты
            </h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Упругость насыщения E_s</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {result.Es.toFixed(2)} гПа
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">Сухоадиабатический γ_a</dt>
                <dd className="font-mono text-sm text-slate-900">
                  {GAMMA_A.toFixed(2)} °C/100 м
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">
                  Влажноадиабатический γ′, °C/100 м
                </dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {result.gamma.toFixed(3)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Зависимость γ′ от температуры
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              При разных давлениях. При низких температурах γ′ → γ_a (воздух
              сухой), при высоких — γ′ заметно меньше γ_a.
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="T"
                    type="number"
                    domain={[-30, 40]}
                    ticks={[-30, -20, -10, 0, 10, 20, 30, 40]}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{
                      value: "Температура T, °C",
                      position: "insideBottomRight",
                      offset: -4,
                      style: { fontSize: 12, fill: "#475569" },
                    }}
                  />
                  <YAxis
                    domain={[0, 1]}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    label={{
                      value: "γ′, °C/100 м",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontSize: 12, fill: "#475569" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => value.toFixed(3)}
                    labelFormatter={(t) => `T = ${t} °C`}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine
                    y={GAMMA_A}
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    label={{
                      value: "γ_a = 0.98",
                      fontSize: 11,
                      fill: "#64748b",
                      position: "insideTopRight",
                    }}
                  />
                  <ReferenceLine
                    x={T}
                    stroke="#1d61d8"
                    strokeDasharray="4 4"
                    label={{
                      value: `T = ${T}`,
                      fontSize: 11,
                      fill: "#1d61d8",
                      position: "top",
                    }}
                  />
                  <Line type="monotone" dataKey="p1000" name="p = 1000 гПа" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="p850" name="p = 850 гПа" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="p700" name="p = 700 гПа" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="p500" name="p = 500 гПа" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: γ′ = γ_a · (1 + L·E_s/(R_d·T·p)) / (1 + L²·E_s·ε/(c_p·R_d·T²·p)).
        E_s(T) — упругость насыщения (Магнус). При подъёме насыщенного воздуха
        часть тепла идёт на испарение, поэтому охлаждение медленнее, чем у
        сухого воздуха.
      </p>
    </div>
  );
}
