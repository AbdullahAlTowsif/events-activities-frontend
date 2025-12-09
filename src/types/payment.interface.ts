// import { IPaymentStatus } from "./enum.interface";
import { IParticipant } from "./participant.interface";
export type PaymentStatusUnion = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
export interface IPayment {
    id?: string;
    // user                  User          @relation(fields: [userEmail], references: [email])
    userEmail: string;
    // event                 Event         @relation(fields: [eventId], references: [id])
    eventId: string;
    amount: number;
    currency: string;
    stripePaymentIntentId?: string;
    status: PaymentStatusUnion;
    createdAt: string;
    updatedAt: string;

    participants?: IParticipant[]
}
