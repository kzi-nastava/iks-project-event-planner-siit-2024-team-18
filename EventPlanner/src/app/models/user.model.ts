export interface User {
    _id: number,
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    companyName?: string;
    profilePhoto?: string;
    address: string;
    phoneNumber: string;
    description?: string;
    categories?: string[];
    eventTypes?: string[];
    password: string;
}  