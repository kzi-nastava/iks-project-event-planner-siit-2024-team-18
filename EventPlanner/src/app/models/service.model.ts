export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    isVisible: boolean;
    isAvailable: boolean;
    isDeleted: boolean;
    reservationType: 'auto' | 'manual';

    specifics: string;
    minDuration: number;
    maxDuration: number;
    reservationDeadline: number;
    cancellationDeadline: number;
  }
  