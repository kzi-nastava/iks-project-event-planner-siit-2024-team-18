export interface Chat {
    id: number;
    user1: number;
    user2: number;
    isDeleted: boolean;
}

export interface Message {
    id: number;
    content: string;
    seen: boolean;
    chatId: number;
    senderUsername: string;
    date: Date;
    isDeleted: boolean;
}
