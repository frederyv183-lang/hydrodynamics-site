"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { lat: 0, speed: 0 },
  { lat: 10, speed: 11.5 },
  { lat: 20, speed: 5.8 },
  { lat: 30, speed: 4.0 },
  { lat: 40, speed: 3.1 },
  { lat: 45, speed: 2.8 },
  { lat: 50, speed: 2.6 },
  { lat: 60, speed: 2.3 },
  { lat: 70, speed: 2.1 },
  { lat: 80, speed: 2.0 },
  { lat: 90, speed: 2.0 },
];

const GeostrophicWindChart: React.FC = () => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-4">
        Зависимость скорости геострофического ветра от широты
      </h3>
      <p className="text-gray-600 mb-4">
        При фиксированном градиенте давления (1 гПа/100 км) и плотности воздуха (1.3 кг/м³).
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="lat"
            label={{ value: 'Широта, °', position: 'insideBottomRight', offset: 0 }}
          />
          <YAxis
            label={{ value: 'Скорость ветра, м/с', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#8884d8"
            name="Скорость геострофического ветра"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeostrophicWindChart;
