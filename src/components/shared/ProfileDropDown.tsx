// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { User, LogOut, ChevronDown, UserPlus, Crown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { PersonInfo } from "@/types/person.interface";
// import LogoutButton from "./LogoutButton";

// interface ProfileDropdownProps {
//     userInfo: PersonInfo;
//     mobileView?: boolean;
// }

// export default function ProfileDropdown({ userInfo, mobileView = false }: ProfileDropdownProps) {
//     const [isOpen, setIsOpen] = useState(false);

//     // Helper function to get profile photo based on role
//     const getProfilePhoto = () => {
//         switch (userInfo.role) {
//             case "USER":
//                 return userInfo.user?.profilePhoto;
//             case "ADMIN":
//                 return userInfo.admin?.profilePhoto;
//             case "HOST":
//                 return userInfo.host?.profilePhoto;
//             default:
//                 return undefined;
//         }
//     };

//     // Helper function to get name based on role
//     const getName = () => {
//         switch (userInfo.role) {
//             case "USER":
//                 return userInfo.user?.name || userInfo.email?.split('@')[0];
//             case "ADMIN":
//                 return userInfo.admin?.name || userInfo.email?.split('@')[0];
//             case "HOST":
//                 return userInfo.host?.name || userInfo.email?.split('@')[0];
//             default:
//                 return userInfo.email?.split('@')[0] || "User";
//         }
//     };

//     // Helper function to get additional info based on role
//     const getAdditionalInfo = () => {
//         switch (userInfo.role) {
//             case "USER":
//                 return userInfo.user?.contactNumber || "";
//             case "ADMIN":
//                 return userInfo.admin?.contactNumber || "Administrator";
//             case "HOST":
//                 return userInfo.host?.contactNumber || "Event Host";
//             default:
//                 return "";
//         }
//     };

//     const getRoleIcon = () => {
//         switch (userInfo.role) {
//             case "ADMIN":
//                 return <Crown className="h-3 w-3 text-amber-600" />;
//             case "HOST":
//                 return <UserPlus className="h-3 w-3 text-blue-600" />;
//             default:
//                 return <User className="h-3 w-3 text-gray-600" />;
//         }
//     };

//     const profilePhotoUrl = getProfilePhoto();
//     const name = getName();
//     const additionalInfo = getAdditionalInfo();

//     if (mobileView) {
//         return (
//             <div className="relative">
//                 {profilePhotoUrl ? (
//                     <Image
//                         src={profilePhotoUrl.startsWith('http') ? profilePhotoUrl : `${process.env.NEXT_PUBLIC_API_URL || ''}${profilePhotoUrl}`}
//                         alt="Profile"
//                         width={48}
//                         height={48}
//                         className="rounded-full object-cover border-2 border-primary"
//                     />
//                 ) : (
//                     <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
//                         <User className="h-6 w-6 text-primary" />
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     return (
//         <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//             <DropdownMenuTrigger asChild>
//                 {/* variant="ghost" */}
//                 <button  className="relative rounded-full p-0 hover:bg-transparent">
//                     {profilePhotoUrl ? (
//                         <Image
//                             src={profilePhotoUrl.startsWith('http') ? profilePhotoUrl : `${process.env.NEXT_PUBLIC_API_URL || ''}${profilePhotoUrl}`}
//                             alt="Profile"
//                             width={40}
//                             height={40}
//                             className="rounded-full w-10 h-10 object-cover border-2 border-transparent hover:border-primary transition-colors"
//                         />
//                     ) : (
//                         <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-transparent hover:border-primary transition-colors">
//                             <User className="h-5 w-5 text-primary" />
//                         </div>
//                     )}
//                     <ChevronDown className="absolute -bottom-1 -right-1 h-4 w-4 bg-background rounded-full border" />
//                 </button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                     <div className="flex flex-col space-y-1">
//                         <div className="flex items-center justify-between">
//                             <p className="text-sm font-medium leading-none">
//                                 {name}
//                             </p>
//                             <div className="flex items-center">
//                                 {getRoleIcon()}
//                                 <span className="ml-1 text-xs text-muted-foreground capitalize">
//                                     {userInfo.role.toLowerCase()}
//                                 </span>
//                             </div>
//                         </div>
//                         <p className="text-xs leading-none text-muted-foreground">
//                             {userInfo.email}
//                         </p>
//                         {additionalInfo && (
//                             <p className="text-xs leading-none text-muted-foreground">
//                                 {additionalInfo}
//                             </p>
//                         )}
//                     </div>
//                 </DropdownMenuLabel>

//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem className="p-0 focus:bg-transparent">
//                     <Button
//                         variant="ghost"
//                         className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
//                     >
//                         <LogOut className="h-2 w-2" />
//                         <LogoutButton />
//                     </Button>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }


"use client";

import { useState } from "react";
import Image from "next/image";
import { User, LogOut, ChevronDown, UserPlus, Crown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonInfo } from "@/types/person.interface";
import LogoutButton from "./LogoutButton";

interface ProfileDropdownProps {
    userInfo: PersonInfo;
    mobileView?: boolean;
}

export default function ProfileDropdown({ userInfo, mobileView = false }: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Helper function to get profile photo based on role
    const getProfilePhoto = () => {
        switch (userInfo.role) {
            case "USER":
                return userInfo.user?.profilePhoto;
            case "ADMIN":
                return userInfo.admin?.profilePhoto;
            case "HOST":
                return userInfo.host?.profilePhoto;
            default:
                return undefined;
        }
    };

    // Helper function to get name based on role
    const getName = () => {
        switch (userInfo.role) {
            case "USER":
                return userInfo.user?.name || userInfo.email?.split('@')[0];
            case "ADMIN":
                return userInfo.admin?.name || userInfo.email?.split('@')[0];
            case "HOST":
                return userInfo.host?.name || userInfo.email?.split('@')[0];
            default:
                return userInfo.email?.split('@')[0] || "User";
        }
    };

    // Helper function to get additional info based on role
    const getAdditionalInfo = () => {
        switch (userInfo.role) {
            case "USER":
                return userInfo.user?.contactNumber || "";
            case "ADMIN":
                return userInfo.admin?.contactNumber || "Administrator";
            case "HOST":
                return userInfo.host?.contactNumber || "Event Host";
            default:
                return "";
        }
    };

    const getRoleIcon = () => {
        switch (userInfo.role) {
            case "ADMIN":
                return <Crown className="h-3 w-3 text-amber-600" />;
            case "HOST":
                return <UserPlus className="h-3 w-3 text-blue-600" />;
            default:
                return <User className="h-3 w-3 text-gray-600" />;
        }
    };

    const profilePhotoUrl = getProfilePhoto();
    const name = getName();
    const additionalInfo = getAdditionalInfo();

    if (mobileView) {
        return (
            <div className="relative">
                {profilePhotoUrl ? (
                    <Image
                        src={profilePhotoUrl.startsWith('http') ? profilePhotoUrl : `${process.env.NEXT_PUBLIC_API_URL || ''}${profilePhotoUrl}`}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-primary"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                        <User className="h-6 w-6 text-primary" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {/* variant="ghost" */}
                <button className="relative rounded-full p-0 hover:bg-transparent">
                    {profilePhotoUrl ? (
                        <Image
                            src={profilePhotoUrl.startsWith('http') ? profilePhotoUrl : `${process.env.NEXT_PUBLIC_API_URL || ''}${profilePhotoUrl}`}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full object-cover border-2 border-transparent hover:border-primary transition-colors"
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-transparent hover:border-primary transition-colors">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                    )}
                    <ChevronDown className="absolute -bottom-1 -right-1 h-4 w-4 bg-background rounded-full border" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">
                                {name}
                            </p>
                            <div className="flex items-center">
                                {getRoleIcon()}
                                <span className="ml-1 text-xs text-muted-foreground capitalize">
                                    {userInfo.role.toLowerCase()}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userInfo.email}
                        </p>
                        {additionalInfo && (
                            <p className="text-xs leading-none text-muted-foreground">
                                {additionalInfo}
                            </p>
                        )}
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Logout Item - Don't wrap Button inside DropdownMenuItem */}
                <DropdownMenuItem
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
