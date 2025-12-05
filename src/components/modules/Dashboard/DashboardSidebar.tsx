import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { PersonInfo } from "@/types/person.interface";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
    const userInfo = (await getUserInfo()) as PersonInfo;

    const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <DashboardSidebarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardSidebar;
