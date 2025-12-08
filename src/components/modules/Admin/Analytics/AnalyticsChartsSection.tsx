"use client";

import { BarChart3, LineChart as LineChartIcon, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RevenueTrendChart from './RevenueTrendChart';
import UserDistributionChart from './UserDistributionChart';
import EventStatisticsChart from './EventStatisticsChart';
import { IDashboardStats } from '@/types/analytics.interface';
import EventCategoriesChart from './EventCategoriesChart';
import UserGrowthChart from './UserGrowthChart';

interface AnalyticsChartsSectionProps {
    stats: IDashboardStats;
    chartType: 'bar' | 'line' | 'area';
    onChartTypeChange: (type: 'bar' | 'line' | 'area') => void;
}

export default function AnalyticsChartsSection({
    stats,
    chartType,
    onChartTypeChange
}: AnalyticsChartsSectionProps) {
    // Mock data (in real app, fetch from API)
    const revenueTrendData = [
        { month: 'Jan', revenue: 4000 },
        { month: 'Feb', revenue: 3000 },
        { month: 'Mar', revenue: 5000 },
        { month: 'Apr', revenue: 2780 },
        { month: 'May', revenue: 3890 },
        { month: 'Jun', revenue: 4390 },
        { month: 'Jul', revenue: 3490 },
    ];

    const userDistributionData = [
        { name: 'Users', value: stats.totalUsers },
        { name: 'Hosts', value: stats.totalHosts },
        { name: 'Admins', value: 5 },
    ];

    const eventStatsData = [
        { name: 'Total Events', value: stats.totalEvents },
        { name: 'Successful Payments', value: stats.totalPayments },
    ];

    const userGrowthData = [
        { month: 'Jan', users: 150, hosts: 20 },
        { month: 'Feb', users: 200, hosts: 25 },
        { month: 'Mar', users: 280, hosts: 30 },
        { month: 'Apr', users: 350, hosts: 35 },
        { month: 'May', users: 420, hosts: 40 },
        { month: 'Jun', users: 500, hosts: 45 },
        { month: 'Jul', users: 600, hosts: 50 },
    ];

    const eventCategoriesData = [
        { name: 'Workshop', count: 45, revenue: 45000 },
        { name: 'Conference', count: 20, revenue: 80000 },
        { name: 'Meetup', count: 35, revenue: 15000 },
        { name: 'Seminar', count: 15, revenue: 30000 },
        { name: 'Training', count: 25, revenue: 50000 },
    ];

    return (
        <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex justify-between items-center">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                    <Button
                        variant={chartType === 'bar' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onChartTypeChange('bar')}
                    >
                        <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={chartType === 'line' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onChartTypeChange('line')}
                    >
                        <LineChartIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={chartType === 'area' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onChartTypeChange('area')}
                    >
                        <Activity className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Trend</CardTitle>
                            <CardDescription>Monthly revenue overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RevenueTrendChart
                                data={revenueTrendData}
                                chartType={chartType}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>User Distribution</CardTitle>
                            <CardDescription>Breakdown by user type</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <UserDistributionChart data={userDistributionData} />
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Event Statistics</CardTitle>
                        <CardDescription>Platform event metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EventStatisticsChart data={eventStatsData} />
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Revenue Tab */}
            <TabsContent value="revenue" className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Statistics</CardTitle>
                        <CardDescription>Payment volume and success rates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Total Revenue</h3>
                                <div className="text-3xl font-bold text-green-600">
                                    {new Intl.NumberFormat('en-BD', {
                                        style: 'currency',
                                        currency: 'BDT',
                                        minimumFractionDigits: 0,
                                    }).format(stats.totalRevenue)}
                                </div>
                                <div className="flex items-center text-green-600">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    <span className="text-sm">+22.7% from last month</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Successful Payments</h3>
                                <div className="text-3xl font-bold text-blue-600">
                                    {stats.totalPayments}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Total successful transactions
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Average Payment</h3>
                                <div className="text-3xl font-bold text-purple-600">
                                    {new Intl.NumberFormat('en-BD', {
                                        style: 'currency',
                                        currency: 'BDT',
                                        minimumFractionDigits: 0,
                                    }).format(stats.totalPayments > 0 ? stats.totalRevenue / stats.totalPayments : 0)}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Average transaction value
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
                <Card>
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                        <CardDescription>User acquisition over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UserGrowthChart data={userGrowthData} chartType={chartType} />
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
                <Card>
                    <CardHeader>
                        <CardTitle>Event Categories</CardTitle>
                        <CardDescription>Distribution of event types</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EventCategoriesChart data={eventCategoriesData} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
