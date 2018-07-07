import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function BulbBarChart({ data }) {
  return (
    <BarChart width={1400} height={400} data={data}>
      <XAxis dataKey="date" />
      <YAxis dataKey="energyUsage" />
      <CartesianGrid horizontal={false} />
      <Tooltip cursor={false} />
      <Bar dataKey="energyUsage" fill="#03ad54" />
    </BarChart>
  );
}

