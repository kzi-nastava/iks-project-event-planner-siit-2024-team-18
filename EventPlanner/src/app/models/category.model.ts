export interface Category {
    id: number;
    name: string;
    description: string;
    isDeleted: boolean;
    status: 'PENDING' | 'ACCEPTED' | 'DENIED';
}
