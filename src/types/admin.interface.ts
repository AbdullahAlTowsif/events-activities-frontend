import { PersonRole } from "@/lib/auth-utils";

export interface IAdmin {
    id?: string;
    name: string;
    email: string;
    role: PersonRole;
    profilePhoto?: string;
    contactNumber: string;
    about?: string;
    address?: string;
    gender: "MALE" | "FEMALE";
    interests: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    // person Person @relation(fields: [email], references: [email])

}
