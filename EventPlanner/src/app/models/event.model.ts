export interface Event {
  id: number,
  eventType: string,
  name: string,
  description: string,
  maxParticipants: number,
  privacyType: string,
  locationName: string,
  city: string,
  country: string,
  latitude: number,
  longitude: number,
  date: Date,
  images: string[];
}
