import { IEventStatus, IPaymentStatus, JoinStatusUnion } from "./enum.interface";
import { IParticipant } from "./participant.interface";
import { IPayment } from "./payment.interface";
export type EventStatusUnion = "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";

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
    status: EventStatusUnion;
    images: string[];
    createdAt: string;
    updatedAt: string;

    payments?: IPayment[]
    participants?: IParticipant[]
}


export interface IMyPaidEvent {
  participantId: string;
  joinedAt: string;
  joinStatus: JoinStatusUnion;
  paid: boolean;
  payment: {
    id: string;
    amount: number;
    currency: string;
    status: IPaymentStatus;
    stripePaymentIntentId?: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  event: {
    id: string;
    title: string;
    type: string;
    location: string;
    dateTime: string;
    joiningFee: number;
    currency: string;
    status: IEventStatus;
    images: string[];
    host: {
      id: string;
      name: string;
      email: string;
      profilePhoto: string;
    } | null;
  } | null;
}