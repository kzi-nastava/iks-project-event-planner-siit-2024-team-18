export interface Chat {
    id: number;
    user1: string;
    user2: string;
    isDeleted: boolean;
}

export interface Message {
    id: number;
    content: string;
    seen: boolean;
    chatId: number;
    senderUsername: string;
    isDeleted: boolean;
}
