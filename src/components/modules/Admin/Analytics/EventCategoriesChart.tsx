"use client";

import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface EventCategoriesChartProps {
    data: Array<{ name: string; count: number; revenue: number }>;
}

export default function EventCategoriesChart({ data }: EventCategoriesChartProps) {
    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis yAxisId="left" stroke="#6b7280" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                    <Tooltip
                        formatter={(value, name) => {
                            if (name === 'revenue') {
                                return [new Intl.NumberFormat('en-BD', {
                                    style: 'currency',
                                    currency: 'BDT',
                                    minimumFractionDigits: 0,
                                }).format(Number(value)), 'Revenue'];
                            }
                            return [value, 'Count'];
                        }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="#f59e0b" name="Event Count" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="revenue" fill="#8b5cf6" name="Revenue" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
}
