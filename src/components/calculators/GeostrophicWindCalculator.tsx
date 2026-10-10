"use client";

import React, { useState } from 'react';

const GeostrophicWindCalculator: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(45);
  const [pressureGradient, setPressureGradient] = useState<number>(1); // гПа/100 км
  const [density, setDensity] = useState<number>(1.3); // кг/м³
  const [result, setResult] = useState<{ speed: number; direction: string } | null>(null);

  const calculate = () => {
    const f = 2 * 7.2921e-5 * Math.sin((latitude * Math.PI) / 180);
    if (f === 0) {
      setResult({ speed: 0, direction: 'Не определено (экватор)' });
      return;
    }
    const gradientPaPerM = (pressureGradient * 100) / 100000; // Па/м
    const speed = gradientPaPerM / (density * Math.abs(f));
    const direction = f > 0 ? 'Вдоль изобар, низкое давление слева' : 'Вдоль изобар, низкое давление справа';
    setResult({ speed, direction });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Калькулятор геострофического ветра</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Широта (°)</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Градиент давления (гПа/100 км)</label>
          <input
            type="number"
            value={pressureGradient}
            onChange={(e) => setPressureGradient(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Плотность воздуха (кг/м³)</label>
          <input
            type="number"
            value={density}
            onChange={(e) => setDensity(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        onClick={calculate}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Рассчитать
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-lg">
            Скорость ветра: <span className="font-bold">{result.speed.toFixed(2)} м/с</span>
          </p>
          <p className="text-md text-gray-700">Направление: {result.direction}</p>
        </div>
      )}
    </div>
  );
};

export default GeostrophicWindCalculator;
