import { IPaymentStatus } from "./enum.interface";
import { IParticipant } from "./participant.interface";

export interface IPayment {
    id?: string;
    // user                  User          @relation(fields: [userEmail], references: [email])
    userEmail: string;
    // event                 Event         @relation(fields: [eventId], references: [id])
    eventId: string;
    amount: number;
    currency: string;
    stripePaymentIntentId?: string;
    status: IPaymentStatus;
    createdAt: string;
    updatedAt: string;

    participants?: IParticipant[]
}
