"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export function SigmaCalculator() {
  const [p, setP] = useState(500);
  const [ps, setPs] = useState(1000);

  const result = useMemo(() => {
    const sigma = p / ps;
    return { sigma };
  }, [p, ps]);

  const status =
    result.sigma > 1
      ? { text: "σ > 1: уровень ниже земной поверхности", color: "text-red-400" }
      : result.sigma > 0.9
      ? { text: "Приземный слой", color: "text-yellow-400" }
      : { text: "Свободная атмосфера", color: "text-green-400" };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex justify-between text-sm font-medium">
          <span>Давление уровня p</span>
          <span className="text-cyan-400">{p} гПа</span>
        </label>
        <input
          type="range"
          min={100}
          max={1050}
          step={10}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      <div className="space-y-2">
        <label className="flex justify-between text-sm font-medium">
          <span>Приземное давление pₛ</span>
          <span className="text-cyan-400">{ps} гПа</span>
        </label>
        <input
          type="range"
          min={900}
          max={1050}
          step={5}
          value={ps}
          onChange={(e) => setPs(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      <motion.div
        key={result.sigma.toFixed(4)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-700 bg-slate-900/60 p-4"
      >
        <div className="text-xs uppercase text-slate-400">σ-координата</div>
        <div className="text-3xl font-mono text-cyan-300">{result.sigma.toFixed(4)}</div>
        <div className={`mt-2 text-sm ${status.color}`}>{status.text}</div>
      </motion.div>

      <p className="text-xs text-slate-400">
        На земной поверхности σ = 1. На верхней границе атмосферы σ = 0.
      </p>
    </div>
  );
}
