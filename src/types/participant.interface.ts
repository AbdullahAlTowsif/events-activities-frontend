// import { IJoinStatus } from "./enum.interface";
export type JoinStatusUnion = "PENDING" | "ACCEPTED" | "REJECTED" | "LEFT";


export interface IParticipant {
  id?: string;
//   event     Event      @relation(fields: [eventId], references: [id])
  eventId: string;
//   user      User       @relation(fields: [userEmail], references: [email])
  userEmail: string;
  status: JoinStatusUnion;
  paid: boolean;
  createdAt: string;
}

