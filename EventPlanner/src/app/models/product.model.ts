export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    category: string;
    eventTypes: string[];
    location: string;
    isVisible: boolean;
    isAvailable: boolean;
    isDeleted: boolean;
}