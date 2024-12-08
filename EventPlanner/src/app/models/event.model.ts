export interface Event {
  _id: number,
  eventType: string,
  name: string,
  description: string,
  maxParticipants: number,
  privacyType: string,
  location: string,
  date: Date,
  time: String,
  images: string[];
}