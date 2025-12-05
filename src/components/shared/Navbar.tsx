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

    // Define all navigation items with allowed roles
    const navItems: NavItem[] = [
        { href: "/", label: "Explore Events", roles: ["GUEST", "USER", "HOST", "ADMIN"] },
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

                <div className="hidden md:flex items-center space-x-2">
                    {accessToken ? (
                        <>
                            {userInfo?.email && (
                                <span className="text-sm font-medium mr-2">
                                    Hi, {userInfo.email}
                                </span>
                            )}
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Link href="/register">
                                <Button variant="outline" size="sm" className="mr-2">
                                    Sign Up
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="sm">Login</Button>
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
                                    <>
                                        {userInfo?.email && (
                                            <div className="mb-4 px-3 py-2 bg-accent rounded-md">
                                                <div className="font-medium">{userInfo.email}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {userInfo.role} Account
                                                </div>
                                            </div>
                                        )}
                                        <LogoutButton />
                                    </>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <Link href="/login">
                                            <Button className="w-full">Login</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="outline" className="w-full">
                                                Sign Up
                                            </Button>
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
