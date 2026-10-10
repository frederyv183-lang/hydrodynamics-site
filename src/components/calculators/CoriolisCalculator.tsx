"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const OMEGA = 7.292e-5;

export function CoriolisCalculator() {
  const [phi, setPhi] = useState(55);

  const result = useMemo(() => {
    const phiRad = (phi * Math.PI) / 180;
    const l = 2 * OMEGA * Math.sin(phiRad);
    const period = l !== 0 ? (2 * Math.PI) / Math.abs(l) : Infinity;
    const periodHours = period / 3600;
    return { l, periodHours };
  }, [phi]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex justify-between text-sm font-medium">
          <span>Широта φ</span>
          <span className="text-cyan-400">{phi}°</span>
        </label>
        <input
          type="range"
          min={-90}
          max={90}
          step={1}
          value={phi}
          onChange={(e) => setPhi(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      <motion.div
        key={result.l.toFixed(6)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-700 bg-slate-900/60 p-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase text-slate-400">Параметр Кориолиса l</div>
            <div className="text-2xl font-mono text-cyan-300">
              {result.l.toExponential(3)} с⁻¹
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Период инерционных колебаний</div>
            <div className="text-2xl font-mono text-cyan-300">
              {result.periodHours.toFixed(2)} ч
            </div>
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-slate-400">
        На экваторе (φ = 0) параметр Кориолиса равен нулю, на полюсе — максимален.
      </p>
    </div>
  );
}
