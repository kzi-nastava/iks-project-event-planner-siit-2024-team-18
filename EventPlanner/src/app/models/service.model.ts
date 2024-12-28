export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  isVisible: boolean;
  isAvailable: boolean;
  category: string;
  eventTypes: string[];
  location: string;
  creator: string;
  isDeleted: boolean;
  status: 'PENDING' | 'ACCEPTED' | 'DENIED';
  reservationType: 'AUTOMATIC' | 'MANUAL';

  specifics: string;
  duration?: number;
  minEngagement?: number;
  maxEngagement?: number;
  reservationDeadline: number;
  cancellationDeadline: number;
  workingHoursStart: string;
  workingHoursEnd: string;

  city: string,
  country: string,
  latitude: number,
  longitude: number,
}
  