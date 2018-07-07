import React from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import { rem } from 'polished';

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { toFormattedDate } from '../../lib/formatter';

const tooltipWrapperStyle = {
  opacity: 0.8
};

const tooltipItemStyle = {
  paddingTop: rem(10)
};

export default function BulbBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ right: 30, bottom: 30, left: 30 }}>
        <XAxis dataKey="date" tickLine={false} tickMargin={15} tickFormatter={toFormattedDate} />
        <YAxis dataKey="energyUsage" tickSize={10} tickLine={false} unit="kWh" />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <Tooltip wrapperStyle={tooltipWrapperStyle} itemStyle={tooltipItemStyle} />
        <Bar dataKey="energyUsage" fill="#003766" />
      </BarChart>
    </ResponsiveContainer>
  );
}

BulbBarChart.displayName = 'BulbBarChart';
BulbBarChart.propTypes = {
  data: arrayOf(
    shape({
      date: string,
      energyUsage: number,
      unit: string
    })
  ).isRequired
};
