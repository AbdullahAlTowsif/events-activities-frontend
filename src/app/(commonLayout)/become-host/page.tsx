import BecomeHostHero from "@/components/modules/Host/BecomeHostHero";
import HostApplicationForm from "@/components/modules/Host/HostApplicationForm";
import HostRequirements from "@/components/modules/Host/HostRequirements";
import WhyBecomeHost from "@/components/modules/Host/WhyBecomeHost";

export default function BecomeHostPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-white to-blue-50">
            <BecomeHostHero />
            <WhyBecomeHost />
            <HostRequirements />
            <HostApplicationForm />
        </div>
    );
}
