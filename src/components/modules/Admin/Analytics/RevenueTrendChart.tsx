/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ResponsiveContainer } from 'recharts';
import BarChart from '../Chart/BarChart';
import LineChart from '../Chart/LineChart';
import AreaChart from '../Chart/AreaChart';

interface RevenueTrendChartProps {
    data: Array<{ month: string; revenue: number }>;
    chartType: 'bar' | 'line' | 'area';
}

export default function RevenueTrendChart({ data, chartType }: RevenueTrendChartProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const tooltipFormatter = (value: any, name: string): [string, string] => {
        if (name === 'revenue') {
            return [formatCurrency(Number(value)), 'Revenue'];
        }
        return [String(value), name];
    };

    const chartProps = {
        data,
        xAxisKey: 'month',
        yAxisKey: 'revenue',
        dataKey: 'revenue',
        name: 'Revenue',
        color: '#3b82f6',
        tooltipFormatter: tooltipFormatter
    };

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                    <BarChart {...chartProps} />
                ) : chartType === 'line' ? (
                    <LineChart {...chartProps} />
                ) : (
                    <AreaChart {...chartProps} />
                )}
            </ResponsiveContainer>
        </div>
    );
}
