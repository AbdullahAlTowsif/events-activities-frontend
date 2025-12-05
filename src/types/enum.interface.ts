export interface IEventStatus {
    OPEN: "OPEN";
    FULL: "FULL";
    CANCELLED: "CANCELLED";
    COMPLETED: "COMPLETED";
}

export interface IJoinStatus {
    PENDING: "PENDING";
    ACCEPTED: "ACCEPTED";
    REJECTED: "REJECTED";
    LEFT: "LEFT";
}

export interface IPaymentStatus {
    PENDING: "PENDING";
    SUCCESS: "SUCCESS";
    FAILED: "FAILED";
    REFUNDED: "REFUNDED";
}


export interface IHostApplicationStatus {
    PENDING: "PENDING";
    APPROVED: "APPROVED";
    REJECTED: "REJECTED";
    CANCELLED: "CANCELLED";
}

