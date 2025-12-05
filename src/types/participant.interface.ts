import { IJoinStatus } from "./enum.interface";

export interface IParticipant {
  id?: string;
//   event     Event      @relation(fields: [eventId], references: [id])
  eventId: string;
//   user      User       @relation(fields: [userEmail], references: [email])
  userEmail: string;
  status: IJoinStatus;
  paid: boolean;
  createdAt: string;
}

