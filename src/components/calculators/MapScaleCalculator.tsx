"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Projection = "stereo" | "conic" | "cylindrical";

const PROJECTION_LABELS: Record<Projection, string> = {
  stereo: "Стереографическая",
  conic: "Коническая (Ламберта)",
  cylindrical: "Цилиндрическая",
};

export function MapScaleCalculator() {
  const [projection, setProjection] = useState<Projection>("stereo");
  const [phi, setPhi] = useState(60);

  const result = useMemo(() => {
    const phiRad = (phi * Math.PI) / 180;
    let m = 1;

    if (projection === "stereo") {
      m = Math.sin((60 * Math.PI) / 180) / (1 + Math.sin(phiRad));
    } else if (projection === "conic") {
      const alpha = 0.7156;
      const k = 1.793;
      const tg = Math.tan((Math.PI / 2 - phiRad) / 2);
      m = (alpha / 1) * k * Math.pow(tg, alpha);
      const phiRef = (45 * Math.PI) / 180;
      const tgRef = Math.tan((Math.PI / 2 - phiRef) / 2);
      const mRef = alpha * k * Math.pow(tgRef, alpha);
      m = m / mRef;
    } else {
      const phik = (22.5 * Math.PI) / 180;
      m = Math.cos(phik) / Math.cos(phiRad);
    }

    return { m };
  }, [projection, phi]);

  const correction = (result.m - 1) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PROJECTION_LABELS) as Projection[]).map((key) => (
          <button
            key={key}
            onClick={() => setProjection(key)}
            className={`rounded-md border px-3 py-1.5 text-sm transition ${
              projection === key
                ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                : "border-slate-700 text-slate-400 hover:border-slate-500"
            }`}
          >
            {PROJECTION_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="flex justify-between text-sm font-medium">
          <span>Широта φ</span>
          <span className="text-cyan-400">{phi}°</span>
        </label>
        <input
          type="range"
          min={-80}
          max={80}
          step={1}
          value={phi}
          onChange={(e) => setPhi(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      <motion.div
        key={`${projection}-${phi}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-700 bg-slate-900/60 p-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase text-slate-400">Масштабный множитель m</div>
            <div className="text-2xl font-mono text-cyan-300">{result.m.toFixed(4)}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-slate-400">Поправка к расстояниям</div>
            <div className="text-2xl font-mono text-cyan-300">
              {correction >= 0 ? "+" : ""}
              {correction.toFixed(2)} %
            </div>
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-slate-400">
        Конформные проекции сохраняют углы, но искажают расстояния. m = 1 — идеальный масштаб.
      </p>
    </div>
  );
}
