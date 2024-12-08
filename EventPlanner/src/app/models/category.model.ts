export interface Category {
    id: number;
    name: string;
    description: string;
    eventTypes?: string[];
    isDeleted: boolean;
    status: 'PENDING' | 'ACCEPTED' | 'DENIED';
}
    