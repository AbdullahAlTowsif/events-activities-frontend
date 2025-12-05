import { PersonRole } from "@/lib/auth-utils";

export interface NavItem {
    title: string;
    href: string;
    icon: string; // ✅ Changed from LucideIcon to string
    badge?: string | number;
    description?: string;
    roles: PersonRole[];
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}
