"use client";

import { Users, Calendar, UserPlus, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { IDashboardStats } from '@/types/analytics.interface';

interface AnalyticsStatsCardsProps {
    stats: IDashboardStats;
}

export default function AnalyticsStatsCards({ stats }: AnalyticsStatsCardsProps) {
    const formatCurrency = (amount: number, currency: string = 'BDT') => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const statCards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <Users className="h-6 w-6" />,
            description: "Registered users",
            trend: 12.5,
            color: "blue",
            format: (val: number) => val.toString()
        },
        {
            title: "Total Hosts",
            value: stats.totalHosts,
            icon: <UserPlus className="h-6 w-6" />,
            description: "Event hosts",
            trend: 8.2,
            color: "green",
            format: (val: number) => val.toString()
        },
        {
            title: "Total Events",
            value: stats.totalEvents,
            icon: <Calendar className="h-6 w-6" />,
            description: "Events created",
            trend: 15.3,
            color: "purple",
            format: (val: number) => val.toString()
        },
        {
            title: "Total Revenue",
            value: stats.totalRevenue,
            icon: <DollarSign className="h-6 w-6" />,
            description: "From successful payments",
            trend: 22.7,
            color: "amber",
            format: (val: number) => formatCurrency(val)
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
                <Card key={index}>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                    card.color === 'green' ? 'bg-green-100 text-green-600' :
                                        card.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                            'bg-amber-100 text-amber-600'
                                }`}>
                                {card.icon}
                            </div>
                            <div className="flex items-center text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span className="text-sm font-medium">+{card.trend}%</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="text-2xl font-bold">{card.format(card.value)}</div>
                            <div className="text-sm font-medium text-gray-900 mt-1">{card.title}</div>
                            <div className="text-sm text-gray-500 mt-1">{card.description}</div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
