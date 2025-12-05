import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import Logo from "../../assets/icons/fireworks_041.jpg"
import Image from "next/image";
// import { getCookie } from "@/services/auth/tokenHandlers";

const Navbar = async () => {
    const navItems = [
        { href: "/", label: "Explore Events" },
        { href: "#", label: "Become a Host" },
        { href: "#", label: "Create Event" },
        { href: "#", label: "My Events" },
        { href: "#", label: "Reviews" },
    ];

    // const accessToken = await getCookie("accessToken");

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src={Logo} alt="Logo" width={50} height={50} />
                    <span className="text-xl font-bold text-primary">Events</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-foreground hover:text-primary transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-2">
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                    {/* {accessToken ? (
                        <LogoutButton />
                    ) : (
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                    )} */}
                </div>

                {/* Mobile Menu */}

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline"> <Menu /> </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <nav className="flex flex-col space-y-4 mt-8">
                                {navItems.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="text-lg font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="border-t pt-4 flex flex-col space-y-4">
                                    <div className="flex justify-center"></div>
                                    <Link href="/login" className="text-lg font-medium">
                                        <Button>Login</Button>
                                    </Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
