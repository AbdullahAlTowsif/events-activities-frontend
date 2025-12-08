"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface UserDistributionChartProps {
    data: Array<{ name: string; value: number }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function UserDistributionChart({ data }: UserDistributionChartProps) {
    return (
        <>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name}: ${entry.value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Count']} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                {data.map((item, index) => (
                    <div key={item.name} className="space-y-1">
                        <div className="text-sm font-medium text-gray-700">{item.name}</div>
                        <div className="text-2xl font-bold" style={{ color: COLORS[index] }}>
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
