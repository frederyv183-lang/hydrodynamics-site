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

const OMEGA = 7.2921e-5;

export function GradientWindAnticycloneCalculator() {
  const [phi, setPhi] = useState<number>(45);
  const [r, setR] = useState<number>(300);
  const [gradP, setGradP] = useState<number>(0.5);
  const [rho, setRho] = useState<number>(1.2);
  const [calculated, setCalculated] = useState<boolean>(false);

  const markDirty = () => setCalculated(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const phiRad = (phi * Math.PI) / 180;
    const f = 2 * OMEGA * Math.sin(phiRad);
    const rM = r * 1000;
    const gradPaPerM = (gradP * 100) / 100000;
    const omega_r = (f * rM) / 2;
    const inner = omega_r * omega_r - (rM / rho) * gradPaPerM;
    if (inner < 0) {
      return { v: NaN, f, omega_r, inner, unstable: true };
    }
    const v = omega_r - Math.sqrt(inner);
    return { v, f, omega_r, inner, unstable: false };
  }, [phi, r, gradP, rho, calculated]);

  // График: v(r) при разных градиентах
  const chartData = useMemo(() => {
    if (!calculated) return [];
    const phiRad = (phi * Math.PI) / 180;
    const f = 2 * OMEGA * Math.sin(phiRad);
    const data: { r: number; g02: number; g05: number; g1: number; g2: number }[] = [];
    for (let rr = 50; rr <= 1500; rr += 25) {
      const rM = rr * 1000;
      const build = (gp: number) => {
        const gpam = (gp * 100) / 100000;
        const wr = (f * rM) / 2;
        const inner = wr * wr - (rM / rho) * gpam;
        if (inner < 0) return NaN;
        return Number((wr - Math.sqrt(inner)).toFixed(2));
      };
      data.push({ r: rr, g02: build(0.2), g05: build(0.5), g1: build(1), g2: build(2) });
    }
    return data;
  }, [phi, rho, calculated]);

  const phiOk = phi >= -90 && phi <= 90;
  const rOk = r >= 50 && r <= 3000;
  const gOk = gradP >= 0 && gradP <= 5;
  const rhoOk = rho >= 0.5 && rho <= 1.5;
  const canCalc = phiOk && rOk && gOk && rhoOk;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Широта φ, °</span>
          <input type="number" value={phi} step={1}
            onChange={(e) => { setPhi(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!phiOk && <span className="mt-1 block text-xs text-red-600">−90…+90°</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Радиус r, км</span>
          <input type="number" value={r} step={10} min={0}
            onChange={(e) => { setR(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!rOk && <span className="mt-1 block text-xs text-red-600">50…3000 км</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Градиент ∂p/∂r, гПа/100 км</span>
          <input type="number" value={gradP} step={0.05} min={0}
            onChange={(e) => { setGradP(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!gOk && <span className="mt-1 block text-xs text-red-600">0…5 гПа/100 км</span>}
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Плотность ρ, кг/м³</span>
          <input type="number" value={rho} step={0.01}
            onChange={(e) => { setRho(Number(e.target.value)); markDirty(); }}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
          {!rhoOk && <span className="mt-1 block text-xs text-red-600">0.5…1.5 кг/м³</span>}
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
                <dt className="text-sm text-slate-600">f</dt>
                <dd className="font-mono text-sm text-slate-900">{result.f.toExponential(3)} с⁻¹</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-sm text-slate-600">ωr</dt>
                <dd className="font-mono text-sm text-slate-900">{result.omega_r.toFixed(4)} м/с</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 sm:col-span-2">
                <dt className="text-sm text-slate-600 font-semibold">Скорость v, м/с</dt>
                <dd className="font-mono text-lg font-semibold text-brand-700">
                  {isNaN(result.v) ? "— (неустойчиво)" : result.v.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>

          {result.unstable && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
              ⚠️ При таких параметрах антициклон <strong>не может существовать</strong>:
              градиент давления превышает предел устойчивости (внутреннее
              выражение под корнем отрицательно). В реальности такие условия
              приводят к разрушению антициклона или переходу к другому типу
              движения.
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Зависимость v(r) в антициклоне</h3>
            <p className="mt-1 text-sm text-slate-600">
              При разных градиентах. Если выражение под корнем &lt; 0 — точка
              не отображается (антициклон неустойчив).
            </p>
            <div className="mt-4" style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="r" type="number" domain={[50, 1500]}
                    ticks={[50, 300, 600, 900, 1200, 1500]} tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "r, км", position: "insideBottomRight", offset: -4, style: { fontSize: 12, fill: "#475569" } }} />
                  <YAxis tick={{ fontSize: 12, fill: "#475569" }}
                    label={{ value: "v, м/с", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#475569" } }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    formatter={(value: number) => [`${value.toFixed(2)} м/с`, "v"]}
                    labelFormatter={(r) => `r = ${r} км`} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <ReferenceLine x={r} stroke="#1d61d8" strokeDasharray="4 4"
                    label={{ value: `r = ${r}`, fontSize: 11, fill: "#1d61d8", position: "top" }} />
                  <Line type="monotone" dataKey="g02" name="∂p/∂r = 0.2" stroke="#0ea5e9" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="g05" name="∂p/∂r = 0.5" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="g1" name="∂p/∂r = 1" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="g2" name="∂p/∂r = 2" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <p className="text-xs leading-relaxed text-slate-500">
        Формула: v = ωr − √((ωr)² − (r/ρ)·∂p/∂r). В антициклоне градиент
        давления направлен от центра, ветер — по часовой стрелке (в Северном
        полушарии). Условие устойчивости: (ωr)² ≥ (r/ρ)·∂p/∂r. При нарушении
        этого условия антициклон разрушается.
      </p>
    </div>
  );
}
