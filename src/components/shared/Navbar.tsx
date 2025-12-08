import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import Logo from "../../assets/icons/fireworks_041.jpg";
import Image from "next/image";
import { getCookie } from "@/services/auth/tokenHandlers";
import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { PersonInfo } from "@/types/person.interface";
import ProfileDropdown from "./ProfileDropDown";

// Navigation item type
interface NavItem {
    href: string;
    label: string;
    roles: string[]; // Array of roles that can see this link
}

const Navbar = async () => {
    const userInfo = (await getUserInfo()) as PersonInfo;
    const userRole = userInfo?.role || "GUEST"; // Default to GUEST if not logged in

    console.log("Current user role:", userRole);
    console.log("Full user info:", userInfo);

    // Helper function to get name from user info
    const getName = () => {
        if (!userInfo) return "";
        switch (userInfo.role) {
            case "USER":
                return userInfo.user?.name || userInfo.email?.split('@')[0];
            case "ADMIN":
                return userInfo.admin?.name || userInfo.email?.split('@')[0];
            case "HOST":
                return userInfo.host?.name || userInfo.email?.split('@')[0];
            default:
                return userInfo.email?.split('@')[0] || "";
        }
    };

    // Define all navigation items with allowed roles
    const navItems: NavItem[] = [
        { href: "/events", label: "Explore Events", roles: ["GUEST", "USER", "HOST", "ADMIN"] },
        { href: "/reviews", label: "Reviews", roles: ["GUEST", "USER", "HOST", "ADMIN"] },
        { href: "/become-host", label: "Become a Host", roles: ["USER"] },
        { href: "/host/events/create", label: "Create Event", roles: ["HOST"] },
        { href: "/dashboard", label: "Dashboard", roles: ["USER"] },
        { href: "/host/dashboard", label: "Dashboard", roles: ["HOST"] },
        { href: "/admin/dashboard", label: "Dashboard", roles: ["ADMIN"] },
    ];

    // Filter links based on user role
    const filteredLinks = navItems.filter(item =>
        item.roles.includes(userRole)
    );

    const accessToken = await getCookie("accessToken");
    const userName = getName();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src={Logo} alt="Logo" width={50} height={50} />
                    <span className="text-xl font-bold text-primary">Events</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {filteredLinks.map((link) => (
                        <Link
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    {accessToken ? (
                        <>
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium">
                                    {userName}
                                </span>
                                <ProfileDropdown userInfo={userInfo} />
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button size="lg">Login</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex items-center space-x-2 mb-6">
                                <Image src={Logo} alt="Logo" width={40} height={40} />
                                <span className="text-lg font-bold">Events</span>
                            </div>

                            {/* User Profile Section in Mobile */}
                            {accessToken && (
                                <div className="mb-6 pb-6 border-b">
                                    <div className="flex items-center space-x-3">
                                        <ProfileDropdown userInfo={userInfo} mobileView />
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {userName || "User"}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {userInfo?.email || ""}
                                            </span>
                                            <span className="text-xs text-muted-foreground capitalize mt-1">
                                                {userRole.toLowerCase()} account
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <nav className="flex flex-col space-y-2">
                                {filteredLinks.map((link) => (
                                    <Link
                                        key={`${link.href}-${link.label}`}
                                        href={link.href}
                                        className="px-3 py-3 text-base font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="absolute bottom-4 left-4 right-4">
                                {accessToken ? (
                                    <div className="space-y-3">
                                        <LogoutButton />
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <Link href="/login">
                                            <Button className="w-full">Login</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
