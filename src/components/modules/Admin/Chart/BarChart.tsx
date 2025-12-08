/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BarChartProps {
    data: any[];
    xAxisKey: string;
    yAxisKey: string;
    dataKey: string;
    name: string;
    color: string;
    tooltipFormatter?: (value: any, name: string) => [string, string];
}

export default function BarChart({
    data,
    xAxisKey,
    yAxisKey,
    dataKey,
    name,
    color,
    tooltipFormatter
}: BarChartProps) {
    return (
        <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xAxisKey} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
                formatter={tooltipFormatter}
                labelStyle={{ color: '#374151' }}
            />
            <Legend />
            <Bar
                dataKey={dataKey}
                fill={color}
                name={name}
                radius={[4, 4, 0, 0]}
            />
        </RechartsBarChart>
    );
}
