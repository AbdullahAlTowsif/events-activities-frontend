"use client";

import { ResponsiveContainer } from 'recharts';
import BarChart from '../Chart/BarChart';

interface EventStatisticsChartProps {
  data: Array<{ name: string; value: number }>;
}

export default function EventStatisticsChart({ data }: EventStatisticsChartProps) {
  const chartProps = {
    data,
    xAxisKey: 'name',
    yAxisKey: 'value',
    dataKey: 'value',
    name: 'Count',
    color: '#8b5cf6'
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...chartProps} />
      </ResponsiveContainer>
    </div>
  );
}