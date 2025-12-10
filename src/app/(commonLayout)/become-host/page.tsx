import BecomeHostHero from "@/components/modules/Host/BecomeHostHero";
import HostApplicationForm from "@/components/modules/Host/HostApplicationForm";
import HostRequirements from "@/components/modules/Host/HostRequirements";
import WhyBecomeHost from "@/components/modules/Host/WhyBecomeHost";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export default function BecomeHostPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-white to-blue-50">
            <Suspense fallback={<div>Loading ...</div>}>
                <BecomeHostHero />
                <WhyBecomeHost />
                <HostRequirements />
                <HostApplicationForm />
            </Suspense>
        </div>
    );
}
