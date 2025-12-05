import { IEventStatus } from "./enum.interface";
import { IParticipant } from "./participant.interface";
import { IPayment } from "./payment.interface";

export interface IEvent {
    id?: string;
    //   host            Host        @relation(fields: [hostEmail], references: [email], name: "hostedEvents")
    hostEmail: string;
    title: string;
    type: string;
    description: string;
    location: string;
    dateTime: string;
    minParticipants?: number;
    maxParticipants?: number;
    joiningFee?: number;
    currency?: string;
    status: IEventStatus;
    images: string[];
    createdAt: string;
    updatedAt: string;

    payments?: IPayment[]
    participants?: IParticipant[]
}

