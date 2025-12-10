import { Suspense } from 'react';

// Force dynamic rendering to handle cookies
export const dynamic = 'force-dynamic';

function DashboardContent() {
    return (
        <div>
            AdminDashboardPage
        </div>
    );
}

const AdminDashboardPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
};

export default AdminDashboardPage;