import { Suspense } from 'react';

// Force dynamic rendering to handle cookies
export const dynamic = 'force-dynamic';

function DashboardContent() {
    return (
        <div>
            UserDashboardPage
        </div>
    );
}

const UserDashboardPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
};

export default UserDashboardPage;