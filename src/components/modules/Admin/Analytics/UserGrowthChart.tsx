/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ResponsiveContainer } from 'recharts';
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';
import AreaChart from '../Chart/AreaChart';

interface UserGrowthChartProps {
    data: Array<{ month: string; users: number; hosts: number }>;
    chartType: 'bar' | 'line' | 'area';
}

export default function UserGrowthChart({ data, chartType }: UserGrowthChartProps) {
    const tooltipFormatter = (value: any, name: string): [string, string] => {
        return [String(value), name.charAt(0).toUpperCase() + name.slice(1)];
    };

    const chartProps = {
        data,
        xAxisKey: 'month',
        yAxisKey: 'users',
        dataKey: 'users',
        name: 'Users',
        color: '#10b981',
        tooltipFormatter: tooltipFormatter
    };

    if (chartType === 'bar') {
        return (
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart {...chartProps} />
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                    <LineChart {...chartProps} />
                ) : (
                    <AreaChart {...chartProps} />
                )}
            </ResponsiveContainer>
        </div>
    );
}
