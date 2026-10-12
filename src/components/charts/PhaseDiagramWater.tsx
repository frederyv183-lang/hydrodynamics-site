"use client";

import { useMemo } from "react";

// ---------- Physical constants ----------
const T_TRIPLE = 273.16;
const P_TRIPLE = 0.00604;
const T_CRIT   = 647.1;
const P_CRIT   = 218;
const T_BOIL_1 = 373.15;

// ---------- Cyrillic labels (via unicode escapes) ----------
const L = {
  ice:         "\u041b\u0451\u0434",                                          // ёд
  water:       "\u0412\u043e\u0434\u0430",                                     // ода
  vapor:       "\u0412\u043e\u0434\u044f\u043d\u043e\u0439 \u043f\u0430\u0440", // одяной пар
  temperature: "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430, K",   // Температура, K
  pressure:    "\u0414\u0430\u0432\u043b\u0435\u043d\u0438\u0435, \u0430\u0442\u043c",     // авление, атм
  title:       "\u0424\u0430\u0437\u043e\u0432\u0430\u044f \u0434\u0438\u0430\u0433\u0440\u0430\u043c\u043c\u0430 \u0432\u043e\u0434\u044b", // азовая диаграмма воды
  phaseLabel:  "\u0424\u0430\u0437\u043e\u0432\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435:", // азовое состояние:
  tempSlider:  "\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430",     // Температура
  pressSlider: "\u0414\u0430\u0432\u043b\u0435\u043d\u0438\u0435",              // авление
  steam:       "\u041f\u0430\u0440",                                            // ар
  iceFull:     "\u041b\u0451\u0434",                                            // ёд
  waterFull:   "\u0412\u043e\u0434\u0430",                                       // ода
  supercrit:   "\u0421\u0432\u0435\u0440\u0445\u043a\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u0436\u0438\u0434\u043a\u043e\u0441\u0442\u044c", // Сверхкритическая жидкость
  boundarySub: "\u0413\u0440\u0430\u043d\u0438\u0446\u0430: \u0441\u0443\u0431\u043b\u0438\u043c\u0430\u0446\u0438\u044f", // раница: сублимация
  boundaryBoil:"\u0413\u0440\u0430\u043d\u0438\u0446\u0430: \u043a\u0438\u043f\u0435\u043d\u0438\u0435", // раница: кипение
  atmos:       "\u0430\u0442\u043c",                                            // атм
  celsius:     "\u00b0C",                                                       // °C
  mb:          "\u043c\u0431"                                                   // мб
};

// ---------- Phase boundaries ----------
function boilingCurve(T: number): number {
  if (T < T_TRIPLE || T > T_CRIT) return NaN;
  return Math.exp(13.7 - 5120 / T);
}

function sublimationCurve(T: number): number {
  if (T >= T_TRIPLE) return NaN;
  return 0.00604 * Math.exp(6140 * (1 / T_TRIPLE - 1 / T));
}

// ---------- Phase detection ----------
export type PhaseResult = {
  phase: string;
  isOnBoundary: boolean;
  color: string;
};

export function detectPhase(T: number, P: number): PhaseResult {
  if (T > T_CRIT && P > P_CRIT) {
    return { phase: L.supercrit, isOnBoundary: false, color: "#7c3aed" };
  }
  if (T < T_TRIPLE) {
    if (P < P_TRIPLE) {
      const P_sub = sublimationCurve(T);
      if (isFinite(P_sub) && Math.abs(P - P_sub) / P_sub < 0.1) {
        return { phase: L.boundarySub, isOnBoundary: true, color: "#0891b2" };
      }
      return { phase: L.steam, isOnBoundary: false, color: "#f59e0b" };
    }
    return { phase: L.iceFull, isOnBoundary: false, color: "#0891b2" };
  }
  if (P < P_TRIPLE) return { phase: L.steam, isOnBoundary: false, color: "#f59e0b" };
  const P_boil = boilingCurve(T);
  if (isFinite(P_boil) && Math.abs(P - P_boil) / P_boil < 0.1) {
    return { phase: L.boundaryBoil, isOnBoundary: true, color: "#16a34a" };
  }
  if (P < P_boil) return { phase: L.steam, isOnBoundary: false, color: "#f59e0b" };
  return { phase: L.waterFull, isOnBoundary: false, color: "#2563eb" };
}

// ---------- Scales ----------
const P_MIN_LOG = Math.log10(0.001);
const P_MAX_LOG = Math.log10(300);
const T_MIN = 200;
const T_MAX = 700;

function pToY(P: number, height: number): number {
  const logP = Math.log10(Math.max(P, 0.001));
  const t = (logP - P_MIN_LOG) / (P_MAX_LOG - P_MIN_LOG);
  return height - t * height;
}

function tToX(T: number, width: number): number {
  return ((T - T_MIN) / (T_MAX - T_MIN)) * width;
}

type Props = {
  temperatureC: number;
  pressureMb: number;
  onTemperatureChange?: (tC: number) => void;
  onPressureChange?: (pMb: number) => void;
};

export default function PhaseDiagramWater({
  temperatureC,
  pressureMb,
  onTemperatureChange,
  onPressureChange
}: Props) {
  const T_K = temperatureC + 273.15;
  const P_atm = pressureMb / 1013.25;
  const phase = useMemo(() => detectPhase(T_K, P_atm), [T_K, P_atm]);

  const W = 560, H = 400;
  const PAD_L = 60, PAD_R = 20, PAD_T = 20, PAD_B = 50;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const boilingPath = useMemo(() => {
    const pts: string[] = [];
    for (let T = T_TRIPLE; T <= T_CRIT; T += 2) {
      const P = boilingCurve(T);
      if (!isFinite(P) || P <= 0) continue;
      const x = PAD_L + tToX(T, innerW);
      const y = PAD_T + pToY(P, innerH);
      pts.push(`${pts.length === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return pts.join(" ");
  }, [innerW, innerH]);

  const sublimationPath = useMemo(() => {
    const pts: string[] = [];
    for (let T = T_MIN; T <= T_TRIPLE; T += 2) {
      const P = sublimationCurve(T);
      if (!isFinite(P) || P <= 0) continue;
      const x = PAD_L + tToX(T, innerW);
      const y = PAD_T + pToY(P, innerH);
      pts.push(`${pts.length === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return pts.join(" ");
  }, [innerW, innerH]);

  const tTripleX = PAD_L + tToX(T_TRIPLE, innerW);
  const tTripleY = PAD_T + pToY(P_TRIPLE, innerH);
  const tCritX = PAD_L + tToX(T_CRIT, innerW);
  const tCritY = PAD_T + pToY(P_CRIT, innerH);
  const tBoilX = PAD_L + tToX(T_BOIL_1, innerW);
  const tBoilY = PAD_T + pToY(1, innerH);
  const curX = PAD_L + tToX(T_K, innerW);
  const curY = PAD_T + pToY(Math.max(P_atm, 0.001), innerH);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="mb-3 text-lg font-semibold text-slate-900">{L.title}</h3>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block h-auto w-full max-w-[640px]">
          <rect x={PAD_L} y={PAD_T} width={innerW} height={innerH} fill="#f8fafc" />
          <rect x={PAD_L} y={PAD_T} width={tTripleX - PAD_L} height={tTripleY - PAD_T} fill="#e0f2fe" opacity="0.5" />
          <rect x={tTripleX} y={PAD_T} width={tCritX - tTripleX} height={tTripleY - PAD_T} fill="#dbeafe" opacity="0.5" />

          <line x1={PAD_L} y1={PAD_T + innerH} x2={PAD_L + innerW} y2={PAD_T + innerH} stroke="#475569" strokeWidth="1.5" />
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + innerH} stroke="#475569" strokeWidth="1.5" />

          {[0.001, 0.01, 0.1, 1, 10, 100].map((p) => {
            const y = PAD_T + pToY(p, innerH);
            return (
              <g key={p}>
                <line x1={PAD_L} y1={y} x2={PAD_L + innerW} y2={y} stroke="#e2e8f0" strokeDasharray="2 3" />
                <text x={PAD_L - 6} y={y + 3} textAnchor="end" fontSize="10" fill="#64748b">{p}</text>
              </g>
            );
          })}

          {[200, 273.16, 373.15, 500, 647.1, 700].map((t) => {
            const x = PAD_L + tToX(t, innerW);
            return (
              <g key={t}>
                <line x1={x} y1={PAD_T} x2={x} y2={PAD_T + innerH} stroke="#e2e8f0" strokeDasharray="2 3" />
                <text x={x} y={PAD_T + innerH + 14} textAnchor="middle" fontSize="10" fill="#64748b">
                  {t === 273.16 ? "273.16" : t === 373.15 ? "373" : t === 647.1 ? "647" : t}
                </text>
              </g>
            );
          })}

          <path d={sublimationPath} fill="none" stroke="#0891b2" strokeWidth="2" />
          <path d={boilingPath} fill="none" stroke="#2563eb" strokeWidth="2" />
          <line x1={tTripleX} y1={tTripleY} x2={tTripleX - 5} y2={PAD_T} stroke="#0f766e" strokeWidth="2" />

          <circle cx={tTripleX} cy={tTripleY} r="3.5" fill="#000" />
          <text x={tTripleX + 6} y={tTripleY - 4} fontSize="11" fontWeight="bold" fill="#000">T</text>
          <circle cx={tCritX} cy={tCritY} r="3.5" fill="#dc2626" />
          <text x={tCritX + 6} y={tCritY - 4} fontSize="11" fontWeight="bold" fill="#dc2626">C</text>
          <circle cx={tBoilX} cy={tBoilY} r="3" fill="#16a34a" />
          <text x={tBoilX + 6} y={tBoilY + 3} fontSize="11" fontWeight="bold" fill="#16a34a">X</text>
          <circle cx={tTripleX} cy={PAD_T + pToY(1, innerH)} r="3" fill="#0f766e" />
          <text x={tTripleX + 6} y={PAD_T + pToY(1, innerH) + 3} fontSize="11" fontWeight="bold" fill="#0f766e">Y</text>

          <text x={PAD_L + tToX(230, innerW)} y={PAD_T + 40} fontSize="13" fill="#0891b2" fontWeight="600">{L.ice}</text>
          <text x={PAD_L + tToX(450, innerW)} y={PAD_T + 40} fontSize="13" fill="#2563eb" fontWeight="600">{L.water}</text>
          <text x={PAD_L + tToX(450, innerW)} y={PAD_T + innerH - 20} fontSize="13" fill="#f59e0b" fontWeight="600">{L.vapor}</text>

          <circle cx={curX} cy={curY} r="6" fill="#fff" stroke={phase.color} strokeWidth="3" />
          <circle cx={curX} cy={curY} r="2.5" fill={phase.color} />

          <text x={PAD_L + innerW / 2} y={H - 8} textAnchor="middle" fontSize="12" fill="#334155">{L.temperature}</text>
          <text x={14} y={PAD_T + innerH / 2} textAnchor="middle" fontSize="12" fill="#334155" transform={`rotate(-90 14 ${PAD_T + innerH / 2})`}>{L.pressure}</text>
        </svg>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 flex items-baseline justify-between text-sm font-medium text-slate-700">
            <span>{L.tempSlider}</span>
            <span className="font-mono text-slate-900">{temperatureC.toFixed(1)} {L.celsius}</span>
          </span>
          <input type="range" min={-50} max={400} step={0.5} value={temperatureC}
            onChange={(e) => onTemperatureChange?.(parseFloat(e.target.value))}
            className="w-full accent-brand-600" />
        </label>
        <label className="block">
          <span className="mb-1 flex items-baseline justify-between text-sm font-medium text-slate-700">
            <span>{L.pressSlider}</span>
            <span className="font-mono text-slate-900">{pressureMb.toFixed(1)} {L.mb}</span>
          </span>
          <input type="range" min={1} max={25000} step={1} value={pressureMb}
            onChange={(e) => onPressureChange?.(parseFloat(e.target.value))}
            className="w-full accent-brand-600" />
        </label>
      </div>

      <div className="mt-4 rounded-lg p-3 text-sm" style={{ backgroundColor: phase.color + "15", borderLeft: `4px solid ${phase.color}` }}>
        <div className="font-medium text-slate-900">{L.phaseLabel}</div>
        <div className="mt-0.5" style={{ color: phase.color }}>{phase.phase}</div>
        <div className="mt-1 text-xs text-slate-500">T = {T_K.toFixed(2)} K, P = {P_atm.toFixed(4)} {L.atmos}</div>
      </div>
    </div>
  );
}