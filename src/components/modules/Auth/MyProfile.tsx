"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { PersonInfo } from "@/types/person.interface";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
    userInfo: PersonInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const getProfilePhoto = () => {
        if (userInfo.role === "ADMIN") {
            return userInfo.admin?.profilePhoto;
        } else if (userInfo.role === "HOST") {
            return userInfo.host?.profilePhoto;
        } else if (userInfo.role === "USER") {
            return userInfo.user?.profilePhoto;
        }
        return null;
    };

    const getProfileData = () => {
        if (userInfo.role === "ADMIN") {
            return userInfo.admin;
        } else if (userInfo.role === "HOST") {
            return userInfo.host;
        } else if (userInfo.role === "USER") {
            return userInfo.user;
        }
        return null;
    };

    const profilePhoto = getProfilePhoto();
    const profileData = getProfileData();

    // Convert interests array to string for display
    const getInterestsString = () => {
        if (userInfo.role === "HOST" && userInfo.host?.interests) {
            return Array.isArray(userInfo.host.interests) 
                ? userInfo.host.interests.join(", ") 
                : userInfo.host.interests;
        } else if (userInfo.role === "USER" && userInfo.user?.interests) {
            return Array.isArray(userInfo.user.interests) 
                ? userInfo.user.interests.join(", ") 
                : userInfo.user.interests;
        }
        return "";
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updateMyProfile(formData);
            console.log("result from my profile", result);

            if (result.success) {
                setSuccess(result.message);
                setPreviewImage(null);
                router.refresh();
            } else {
                setError(result.message);
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your personal information
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Profile Card */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <Avatar className="h-32 w-32">
                                    {previewImage || profilePhoto ? (
                                        <AvatarImage
                                            src={previewImage || (profilePhoto as string)}
                                            alt={userInfo.email}
                                        />
                                    ) : (
                                        <AvatarFallback className="text-3xl">
                                            {getInitials(profileData?.name as string)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <label
                                    htmlFor="file"
                                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                                >
                                    <Camera className="h-4 w-4" />
                                    <Input
                                        type="file"
                                        id="file"
                                        name="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        disabled={isPending}
                                    />
                                </label>
                            </div>

                            <div className="text-center">
                                <p className="font-semibold text-lg">{profileData?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {userInfo.email}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1 capitalize">
                                    {userInfo.role.replace("_", " ")}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Information Card */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                                    {success}
                                </div>
                            )}

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Common Fields for All Roles */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={profileData?.name || userInfo.email}
                                        required
                                        disabled={isPending}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={userInfo.email}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        defaultValue={profileData?.contactNumber || ""}
                                        required
                                        disabled={isPending}
                                    />
                                </div>

                                {/* Host-Specific Fields */}
                                {userInfo.role === "HOST" && userInfo.host && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                defaultValue={userInfo.host.address || ""}
                                                disabled={isPending}
                                            />
                                        </div>

                                        {/* <div className="space-y-2">
                                            <Label htmlFor="interests">
                                                Interests (comma-separated)
                                            </Label>
                                            <Input
                                                id="interests"
                                                name="interests"
                                                defaultValue={getInterestsString()}
                                                placeholder="e.g. Arranging Events, Participate in activities"
                                                required
                                                disabled={isPending}
                                            />
                                        </div> */}

                                        <div className="space-y-2">
                                            <Label htmlFor="about">About</Label>
                                            <Input
                                                id="about"
                                                name="about"
                                                defaultValue={userInfo.host.about || ""}
                                                required
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                defaultValue={userInfo.host.gender || "MALE"}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                disabled={isPending}
                                            >
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {/* User-Specific Fields */}
                                {userInfo.role === "USER" && userInfo.user && (
                                    <>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                defaultValue={userInfo.user.address || ""}
                                                disabled={isPending}
                                            />
                                        </div>
                                        {/* <div className="space-y-2">
                                            <Label htmlFor="interests">
                                                Interests (comma-separated)
                                            </Label>
                                            <Input
                                                id="interests"
                                                name="interests"
                                                defaultValue={getInterestsString()}
                                                placeholder="e.g. Arranging Events, Participate in activities"
                                                required
                                                disabled={isPending}
                                            />
                                        </div> */}

                                        <div className="space-y-2">
                                            <Label htmlFor="about">About</Label>
                                            <Input
                                                id="about"
                                                name="about"
                                                defaultValue={userInfo.user.about || ""}
                                                required
                                                disabled={isPending}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender</Label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                defaultValue={userInfo.user.gender || "MALE"}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                disabled={isPending}
                                            >
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;