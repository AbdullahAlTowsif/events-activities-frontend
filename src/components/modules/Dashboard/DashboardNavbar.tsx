import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { PersonInfo } from "@/types/person.interface";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
    const userInfo = (await getUserInfo()) as PersonInfo;
    const navItems = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <DashboardNavbarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardNavbar;
