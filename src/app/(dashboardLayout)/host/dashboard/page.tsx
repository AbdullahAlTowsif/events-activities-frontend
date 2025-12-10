import { Suspense } from 'react';

// Force dynamic rendering to handle cookies
export const dynamic = 'force-dynamic';

function DashboardContent() {
    return (
        <div>
            HostDashboardPage
        </div>
    );
}

const HostDashboardPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
};

export default HostDashboardPage;