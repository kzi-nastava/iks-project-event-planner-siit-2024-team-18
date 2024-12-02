export interface Service {
    _id: number;
    title: string;
    description: string;
    specifics: string;
    images: string[];
    category: string;
    eventType: string;
    reservationDate: Date;
    reservationTime: string;
    cancellationDate: Date;
    price: number;
    discount?: number;
    isPublic: boolean;
    isVisible: boolean;
    duration?: number;
    engagement?: number[];
    reservationType: 'auto' | 'manual';
  }
  