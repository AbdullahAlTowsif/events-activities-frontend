import { PersonRole } from "@/lib/auth-utils";
import { IUser } from "./user.interface";
import { IAdmin } from "./admin.interface";
import { IHost } from "./host.interface";
import { IHostApplication } from "./hostApplication.interface";

export interface PersonInfo {
    id?: string;
    email: string;
    role: PersonRole;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    user?: IUser;
    admin?: IAdmin;
    host?: IHost;
    hostApplications?: IHostApplication[]

}
