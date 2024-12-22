export interface Reservation {
    reservationId: number;
    serviceId: number;
    eventId: number;
    date: string;
    timeFrom: string;
    timeTo: string;
    status: string;
}