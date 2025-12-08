/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartProps {
    data: any[];
    xAxisKey: string;
    yAxisKey: string;
    dataKey: string;
    name: string;
    color: string;
    tooltipFormatter?: (value: any, name: string) => [string, string];
}

export default function LineChart({
    data,
    xAxisKey,
    yAxisKey,
    dataKey,
    name,
    color,
    tooltipFormatter
}: LineChartProps) {
    return (
        <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xAxisKey} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
                formatter={tooltipFormatter}
                labelStyle={{ color: '#374151' }}
            />
            <Legend />
            <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                name={name}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
            />
        </RechartsLineChart>
    );
}
