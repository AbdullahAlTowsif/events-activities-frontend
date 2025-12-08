export interface IDashboardStats {
    totalUsers: number;
    totalHosts: number;
    totalAdmins: number;
    totalEvents: number;
    totalPayments: number;
    totalRevenue: number;
}

export interface IRecentPayment {
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
    event: {
        title: string;
        hostEmail: string;
    };
}

export interface IUpcomingEvent {
    id: string;
    title: string;
    dateTime: string;
    location: string;
    status: string;
    joiningFee: number;
    currency: string;
    host: {
        name: string;
        email: string;
    };
    _count: {
        participants: number;
    };
}

export interface IDashboardData {
    stats: IDashboardStats;
    recentPayments: IRecentPayment[];
    upcomingEvents: IUpcomingEvent[];
}

export interface IDashboardResponse {
    success: boolean;
    message: string;
    data: IDashboardData;
}
