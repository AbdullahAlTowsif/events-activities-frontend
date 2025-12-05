import { PersonRole } from "@/lib/auth-utils";
import { IReview } from "./review.interface";

export interface IHost {
    id?: string;
    name: string;
    email: string;
    role: PersonRole;
    profilePhoto?: string;
    contactNumber: string;
    about?: string;
    address: string;
    gender: "MALE" | "FEMALE";
    interests: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;

    // events  Event[]  @relation(name: "hostedEvents")
    reviews?: IReview[];

    // person Person @relation(fields: [email], references: [email])

}
