import { PersonRole } from "@/lib/auth-utils";
import { IParticipant } from "./participant.interface";
import { IReview } from "./review.interface";
import { IPayment } from "./payment.interface";
import { IHostApplication } from "./hostApplication.interface";

export interface IUser {
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

    participants?: IParticipant[];
    reviews?: IReview[];
    payments?: IPayment[];

    // person           Person            @relation(fields: [email], references: [email])
    hostApplications?: IHostApplication[];

}



