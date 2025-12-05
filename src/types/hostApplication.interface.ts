import { IHostApplicationStatus } from "./enum.interface";

export interface IHostApplication {
    id?: string;
    userEmail: string;
    // user          User                  @relation(fields: [userEmail], references: [email])
    email: string;
    name: string;
    contactNumber: string;
    address: string;
    gender: "MALE" | "FEMALE";
    interests: string[];
    reason?: string;
    status: IHostApplicationStatus;
    reviewedBy?: string;
    reviewedAt?: string;
    feedback?: string;
    createdAt: string;
    updatedAt: string;
    // person        Person?               @relation(fields: [personEmail], references: [email])
    personEmail?: string;

}
