export interface User {
    id: number,
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    companyName?: string;
    image?: string;
    address: string;
    phone: string;
    description?: string;
    categories?: string[];
    eventTypes?: string[];
    password: string;
}  