/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AreaChartProps {
    data: any[];
    xAxisKey: string;
    yAxisKey: string;
    dataKey: string;
    name: string;
    color: string;
    tooltipFormatter?: (value: any, name: string) => [string, string];
}

export default function AreaChart({
    data,
    xAxisKey,
    yAxisKey,
    dataKey,
    name,
    color,
    tooltipFormatter
}: AreaChartProps) {
    // Add 30% opacity to the fill color
    const fillColor = color + '30';

    return (
        <RechartsAreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xAxisKey} stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
                formatter={tooltipFormatter}
                labelStyle={{ color: '#374151' }}
            />
            <Legend />
            <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                fill={fillColor}
                name={name}
                strokeWidth={2}
            />
        </RechartsAreaChart>
    );
}
