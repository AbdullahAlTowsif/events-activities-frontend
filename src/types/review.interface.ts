export interface IReview {
    id?: string;
    // reviewer  User     @relation(fields: [userEmail], references: [email])
    userEmail: string;
    // host      Host     @relation(fields: [hostEmail], references: [email])
    hostEmail: string;
    rating: number;
    comment?: string;
    createdAt: string;
}
