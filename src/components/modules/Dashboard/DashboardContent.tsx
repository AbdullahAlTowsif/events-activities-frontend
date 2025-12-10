"use client";

import { useState, useEffect } from "react";
import {
    User, Mail, Shield, Calendar, MapPin, Phone,
    Key, Activity, ExternalLink, CheckCircle,
    Award, Users, Eye, Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { PersonInfo } from "@/types/person.interface";

export default function DashboardContent() {
    const [userInfo, setUserInfo] = useState<PersonInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const data = await getUserInfo();
            console.log(data);
            setUserInfo(data);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Admin</Badge>;
            case "HOST":
                return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Host</Badge>;
            case "USER":
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">User</Badge>;
            default:
                return <Badge variant="outline">{role}</Badge>;
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return <Shield className="w-5 h-5 text-red-600" />;
            case "HOST":
                return <Award className="w-5 h-5 text-purple-600" />;
            case "USER":
                return <User className="w-5 h-5 text-blue-600" />;
            default:
                return <User className="w-5 h-5" />;
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const getGenderIcon = (gender?: string) => {
        switch (gender?.toUpperCase()) {
            case "MALE":
                return "👨";
            case "FEMALE":
                return "👩";
            default:
                return "👤";
        }
    };

    const getRoleBasedName = (role: string) => {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return userInfo?.admin?.name;
            case "HOST":
                return userInfo?.host?.name;
            case "USER":
                return userInfo?.user?.name;
            default:
                return "Unknown User";
        }
    };

    const getRoleBasedProfilePhoto = (role: string) => {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return userInfo?.admin?.profilePhoto;
            case "HOST":
                return userInfo?.host?.profilePhoto;
            case "USER":
                return userInfo?.user?.profilePhoto;
            default:
                return <User className="w-5 h-5" />;
        }
    };

    const getRoleBasedContactNumber = (role: string) => {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return userInfo?.admin?.contactNumber;
            case "HOST":
                return userInfo?.host?.contactNumber;
            case "USER":
                return userInfo?.user?.contactNumber;
            default:
                return "Unknown Contact Number🔎";
        }
    };

    const getRoleBasedGender = (role: string) => {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return userInfo?.admin?.gender;
            case "HOST":
                return userInfo?.host?.gender;
            case "USER":
                return userInfo?.user?.gender;
            default:
                return "Unknown Gender";
        }
    };

    const getRoleBasedAddress = (role: string) => {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return userInfo?.admin?.address;
            case "HOST":
                return userInfo?.host?.address;
            case "USER":
                return userInfo?.user?.address;
            default:
                return "Unknown Address 📢";
        }
    };

    if (loading) {
        return null; // Loading handled by Suspense
    }

    if (!userInfo) {
        return (
            <div className="text-center py-16">
                <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">No User Found</h2>
                <p className="text-slate-600 mb-6">Please log in to view your dashboard</p>
                <Button onClick={() => window.location.href = "/login"}>
                    Go to Login
                </Button>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {getRoleBasedName(userInfo.role)}!</h1>
                <p className="text-slate-600">Here&apos;s your personal dashboard with all your account information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Profile */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card */}
                    <Card className="shadow-lg border-0">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">Your Profile</CardTitle>
                            </div>
                            <CardDescription>Your personal information and account details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Avatar Section */}
                                <div className="flex flex-col items-center md:items-start">
                                    <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-lg">
                                        <AvatarImage
                                            src={getRoleBasedProfilePhoto(userInfo.role) as string}
                                            alt={getRoleBasedName(userInfo.role)}
                                        />
                                        <AvatarFallback className="text-2xl bg-linear-to-br from-blue-100 to-purple-100 text-blue-600">
                                            {getRoleBasedName(userInfo.role)!.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getRoleIcon(userInfo.role)}
                                        {getRoleBadge(userInfo.role)}
                                    </div>
                                    <span className="text-sm text-slate-500">
                                        Member since {formatDate(userInfo.createdAt)}
                                    </span>
                                </div>

                                {/* Profile Details */}
                                <div className="flex-1 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoItem
                                            icon={<User className="w-4 h-4" />}
                                            label="Full Name"
                                            value={getRoleBasedName(userInfo.role)!}
                                        />
                                        <InfoItem
                                            icon={<Mail className="w-4 h-4" />}
                                            label="Email Address"
                                            value={userInfo.email}
                                        />
                                        <InfoItem
                                            icon={<Phone className="w-4 h-4" />}
                                            label="Contact Number"
                                            value={getRoleBasedContactNumber(userInfo.role) || "Not provided"}
                                        />
                                        <InfoItem
                                            icon={<MapPin className="w-4 h-4" />}
                                            label="Address"
                                            value={getRoleBasedAddress(userInfo.role) || "Not provided"}
                                        />
                                        <InfoItem
                                            icon="👤"
                                            label="Gender"
                                            value={getRoleBasedGender(userInfo.role) ? getGenderIcon(getRoleBasedGender(userInfo.role)) + " " + getRoleBasedGender(userInfo.role) : "Not specified"}
                                        />
                                        <InfoItem
                                            icon={<Calendar className="w-4 h-4" />}
                                            label="Last Updated"
                                            value={formatDate(userInfo.updatedAt)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard
                            title="Account Status"
                            value="Active"
                            icon={<CheckCircle className="w-5 h-5" />}
                            color="green"
                            description="Your account is in good standing"
                        />
                        <StatCard
                            title="Role Permissions"
                            value={userInfo.role}
                            icon={getRoleIcon(userInfo.role)}
                            color={
                                userInfo.role.toUpperCase() === "ADMIN" ? "red" :
                                    userInfo.role.toUpperCase() === "HOST" ? "purple" : "blue"
                            }
                            description="Your access level on the platform"
                        />
                        <StatCard
                            title="Member Since"
                            value={formatDate(userInfo.createdAt).split(" ")[2]}
                            icon={<Calendar className="w-5 h-5" />}
                            color="slate"
                            description={`Joined in ${formatDate(userInfo.createdAt)}`}
                        />
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                    {/* Account Summary */}
                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="text-lg">Account Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Key className="w-4 h-4" />
                                    Account ID
                                </span>
                                <span className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
                                    {userInfo.id ? userInfo.id.substring(0, 8) + "..." : "N/A"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    Status
                                </span>
                                <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Visibility
                                </span>
                                <span className="text-sm text-slate-900">Public</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 flex items-center gap-2">
                                    <Bell className="w-4 h-4" />
                                    Notifications
                                </span>
                                <span className="text-sm text-slate-900">Enabled</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role-Specific Card */}
                    {userInfo.role.toUpperCase() === "ADMIN" && (
                        <Card className="shadow-lg border-0 bg-linear-to-br from-red-50 to-red-100 border-red-200">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-red-900">
                                    <Shield className="w-5 h-5" />
                                    Admin Privileges
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-red-800 mb-3">
                                    You have administrative access to manage the platform.
                                </p>
                                <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Admin Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {userInfo.role.toUpperCase() === "HOST" && (
                        <Card className="shadow-lg border-0 bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-purple-900">
                                    <Award className="w-5 h-5" />
                                    Host Dashboard
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-purple-800 mb-3">
                                    Manage your events and host activities.
                                </p>
                                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                                    <Users className="w-4 h-4 mr-2" />
                                    Manage Events
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}

// Info Item Component
function InfoItem({
    icon,
    label,
    value
}: {
    icon: React.ReactNode | string;
    label: string;
    value: string;
}) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-slate-500">
                {typeof icon === "string" ? (
                    <span className="text-lg">{icon}</span>
                ) : (
                    icon
                )}
                <span>{label}</span>
            </div>
            <p className="font-medium text-slate-900 truncate">{value}</p>
        </div>
    );
}

// Stat Card Component
function StatCard({
    title,
    value,
    icon,
    color,
    description
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    description: string;
}) {
    const colorClasses = {
        green: "bg-green-50 border-green-200 text-green-800",
        red: "bg-red-50 border-red-200 text-red-800",
        purple: "bg-purple-50 border-purple-200 text-purple-800",
        blue: "bg-blue-50 border-blue-200 text-blue-800",
        slate: "bg-slate-50 border-slate-200 text-slate-800"
    };

    return (
        <Card className={`shadow-sm border ${colorClasses[color as keyof typeof colorClasses]}`}>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-sm opacity-90">{title}</p>
                        <p className="text-2xl font-bold mt-1">{value}</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-white/50`}>
                        {icon}
                    </div>
                </div>
                <p className="text-xs opacity-75">{description}</p>
            </CardContent>
        </Card>
    );
}
