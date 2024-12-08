export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    images: string[];
    isVisible: boolean;
    isAvailable: boolean;
    isDeleted: boolean;
}