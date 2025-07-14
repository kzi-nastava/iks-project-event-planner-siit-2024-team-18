export interface EventDetails {
    id: number,
    name: string,
    description: string,
    maxParticipants: number,
    privacyType: string,
    startDate: Date,
    endDate: Date,
    budget: number,
    images: string[],
    creator: string,
    locationName: string,
    city: string,
    country: string,
    latitude: number,
    longitude: number,
    eventType: string;
}