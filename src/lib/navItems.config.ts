import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, PersonRole } from "./auth-utils";

export const getCommonNavItems = (role: PersonRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Back to Home",
                    href: "/",
                    icon: "House",
                    roles: ["USER", "HOST", "ADMIN"],
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "HOST", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "HOST", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER", "HOST", "ADMIN"],
                },
            ],
        },
        // {
        //     title: "Explore Events",
        //     items: [
        //         {
        //             title: "Events",
        //             href: "/events",
        //             icon: "Activity", // ✅ String
        //             roles: ["USER", "HOST", "ADMIN"],
        //         },
        //     ],
        // },
    ]
}

export const userNavItems: NavSection[] = [
    {
        title: "Enjoy Events",
        items: [
            {
                title: "My Events",
                href: "/dashboard/my-events",
                icon: "Clock", // ✅ String
                roles: ["USER"],
            },
            // {
            //     title: "Prescriptions",
            //     href: "/doctor/dashboard/prescriptions",
            //     icon: "FileText", // ✅ String
            //     roles: ["USER"],
            // },
        ],
    }
]

export const hostNavItems: NavSection[] = [
    {
        title: "Event Management",
        items: [
            {
                title: "My Events",
                href: "/host/dashboard/my-events",
                icon: "Calendar", // ✅ String
                roles: ["HOST"],
            },
            {
                title: "Create Event",
                href: "/host/dashboard/create-event",
                icon: "ClipboardList", // ✅ String
                roles: ["HOST"],
            },
        ],
    },
    // {
    //     title: "Medical Records",
    //     items: [
    //         {
    //             title: "My Prescriptions",
    //             href: "/dashboard/my-prescriptions",
    //             icon: "FileText", // ✅ String
    //             roles: ["PATIENT"],
    //         },
    //         {
    //             title: "Health Records",
    //             href: "/dashboard/health-records",
    //             icon: "Activity", // ✅ String
    //             roles: ["PATIENT"],
    //         },
    //     ],
    // },

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Hosts",
                href: "/admin/dashboard/manage-hosts",
                icon: "Ghost", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Analytics Dashboard",
        items: [
            {
                title: "Analytics",
                href: "/admin/dashboard/analytics-dashboard",
                icon: "Database", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: PersonRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "HOST":
            return [...commonNavItems, ...hostNavItems];
        case "USER":
            return [...commonNavItems, ...userNavItems];
        default:
            return [];
    }
}
