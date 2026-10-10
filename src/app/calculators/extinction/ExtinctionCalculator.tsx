"use client";

import { useMemo, useState } from "react";

export default function ExtinctionCalculator() {
  const [h, setH] = useState("30");
  const [p, setP] = useState("0.7");
  const [F0, setF0] = useState("1.98");

  const result = useMemo(() => {
    const hc = parseFloat(h.replace(",", "."));
    const pv = parseFloat(p.replace(",", "."));
    const F = parseFloat(F0.replace(",", "."));

    if (
      ![hc, pv, F].every(isFinite) ||
      hc < 0 ||
      hc > 90 ||
      pv <= 0 ||
      pv > 1 ||
      F <= 0
    ) {
      return null;
    }

    const rad = (hc * Math.PI) / 180;
    const sinH = Math.sin(rad);
    const m = hc > 0 ? 1 / sinH : Infinity;
    const ratio = Math.pow(pv, m); // F/F₀
    const Fsurf = F * ratio;
    const tau = -Math.log(pv); // оптическая толщина

    return {
      sinH,
      m,
      ratio,
      Fsurf,
      tau
    };
  }, [h, p, F0]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Высота Солнца h_c, град"
          value={h}
          onChange={setH}
        />
        <Field
          label="Коэффициент прозрачности p"
          value={p}
          onChange={setP}
        />
        <Field
          label="Солнечная постоянная F₀, кал/(см²·мин)"
          value={F0}
          onChange={setF0}
        />
      </div>

      {result ? (
        <div className="mt-6 divide-y divide-slate-100 rounded-lg bg-slate-50">
          <Row label="sin h_c" value={result.sinH.toFixed(4)} />
          <Row
            label="Масса атмосферы m = 1/sin h_c"
            value={
              isFinite(result.m) ? result.m.toFixed(2) : "∞"
            }
          />
          <Row
            label="Оптическая толщина τ = −ln p"
            value={result.tau.toFixed(4)}
          />
          <Row
            label="Относительный поток F/F₀ = p^m"
            value={result.ratio.toFixed(4)}
          />
          <Row
            label="Поток на поверхности F, кал/(см²·мин)"
            value={result.Fsurf.toFixed(3)}
          />
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
          Проверьте ввод: 0 ≤ h_c ≤ 90°, 0 &lt; p ≤ 1, F₀ &gt; 0.
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Примечание: формула m = 1/sin h_c справедлива при h_c &gt; 30°. При
        меньших высотах нужно учитывать кривизну атмосферы.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2.5">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="font-mono text-sm font-medium text-slate-900">
        {value}
      </span>
    </div>
  );
}
