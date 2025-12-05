"use client";

import { logoutPerson } from "@/services/auth/logout";
import { Button } from "../ui/button";

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutPerson();
    }
    return (
        // <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
        <Button variant="ghost" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
