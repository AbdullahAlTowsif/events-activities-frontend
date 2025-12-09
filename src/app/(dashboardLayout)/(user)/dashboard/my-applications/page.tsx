import MyApplicationsContent from '@/components/modules/User/MyApplicationsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Applications - Events Platform',
    description: 'View your host application status and history',
};

export default async function MyApplicationsPage() {
    return <MyApplicationsContent />;
}
