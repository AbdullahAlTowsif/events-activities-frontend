/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { getDashboardStats } from '@/services/admin/analyticsDashboard';
import { IDashboardData } from '@/types/analytics.interface';
import AnalyticsStatsCards from './AnalyticsStatsCards';
import AnalyticsChartsSection from './AnalyticsChartsSection';
import AnalyticsRecentActivity from './AnalyticsRecentActivity';

export default function AnalyticsDashboardContent() {
    const [data, setData] = useState<IDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await getDashboardStats();

            if (result.success) {
                setData(result.data);
                setLastUpdated(format(new Date(), 'PPpp'));
            } else {
                setError(result.message || 'Failed to load dashboard statistics');
            }
        } catch (err: any) {
            console.error('Error fetching dashboard stats:', err);
            setError(err.message || 'An error occurred while loading dashboard');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchDashboardStats();
    };

    if (isLoading) {
        return null; // Loading handled by Suspense
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
                        onClick={fetchDashboardStats}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </Alert>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>No data available</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-600 mt-2">
                        Overview of platform statistics and performance metrics
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRefresh}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Badge variant="secondary" className="ml-2">
                        Last updated: {lastUpdated}
                    </Badge>
                </div>
            </div>

            {/* Stats Cards */}
            <AnalyticsStatsCards stats={data.stats} />

            {/* Charts Section */}
            <AnalyticsChartsSection
                stats={data.stats}
                chartType={chartType}
                onChartTypeChange={setChartType}
            />

            {/* Recent Activity */}
            <AnalyticsRecentActivity
                recentPayments={data.recentPayments}
                upcomingEvents={data.upcomingEvents}
            />
        </div>
    );
}
