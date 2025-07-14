import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';
import { Message, Chat } from '../models/chat.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private apiUrl = `${environment.apiHost}/api/chat`;
    private websocketUrl = `${environment.apiHost}/chat`;
    private stompClient: any;
    private allMessagesSubject = new BehaviorSubject<Message[]>([]);
    private messagesPerChatSubject = new BehaviorSubject<Message[]>([]);
    private unseenMessagesPerChatSubject = new BehaviorSubject<
        Map<number, number>
    >(new Map());
    private lastMessagesSubject = new BehaviorSubject<{
        [chatId: number]: Message;
    }>({});
    private currentChatSubject = new BehaviorSubject<Chat | null>(null);
    activeChatSubscriptions: Set<number> = new Set();
    loggedUser: User | null = null;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

    get allMessages$(): Observable<Message[]> {
        return this.allMessagesSubject.asObservable();
    }

    get messagesPerChat$(): Observable<Message[]> {
        return this.messagesPerChatSubject.asObservable();
    }

    get unseenMessagesCount$(): Observable<number> {
        return this.unseenMessagesPerChatSubject.asObservable().pipe(
            map((unseenMessagesPerChat) => {
                let totalUnseenCount = 0;
                unseenMessagesPerChat.forEach((count) => {
                    totalUnseenCount += count;
                });
                return totalUnseenCount;
            })
        );
    }

    get unseenMessagesPerChat$(): Observable<Map<number, number>> {
        return this.unseenMessagesPerChatSubject.asObservable();
    }

    get lastMessages$(): Observable<{ [chatId: number]: Message }> {
        return this.lastMessagesSubject.asObservable();
    }

    get currentChat$(): Observable<Chat | null> {
        return this.currentChatSubject.asObservable();
    }

    initializeWebSocketConnection(user: User): void {
        if (this.stompClient) {
            console.log('WebSocket is already connected.');
            return;
        }

        this.loggedUser = user;

        const ws = new SockJS(this.websocketUrl);
        this.stompClient = Stomp.Stomp.over(ws);

        this.stompClient.connect(
            { userId: this.loggedUser.id.toString() },
            () => {
                console.log(
                    'WebSocket connected for userId:',
                    this.loggedUser!.id
                );
                this.loadInitialChatSubscriptions(this.loggedUser!.id);
            },
            (error: any) => {
                console.error('WebSocket connection error:', error);
            }
        );
    }

    private loadInitialChatSubscriptions(userId: number): void {
        this.getChats(userId).subscribe((chats) => {
            chats.forEach((chat) => {
                this.loadMessages(chat);

                if (!this.activeChatSubscriptions.has(chat.id)) {
                    this.subscribeToChat(chat.id);
                }
            });
        });
    }

    private loadMessages(chat: Chat) {
        this.getMessages(chat.id).subscribe({
            next: (data: Message[]) => {
                this.allMessagesSubject.next([
                    ...this.allMessagesSubject.getValue(),
                    ...data,
                ]);
                this.updateUnseenMessagesCount();
            },
        });
    }

    // triggers when message is received
    subscribeToChat(chatId: number): void {
        this.stompClient.subscribe(
            `/topic/messages/${chatId}`,
            (message: { body: string }) => {
                const newMessage: Message = JSON.parse(message.body);
                const currentMessages = this.allMessagesSubject.getValue();

                // different outcomes depending on who is logged in
                if (newMessage.senderId === this.loggedUser!.id) {
                    this.updateMessages([
                        ...this.messagesPerChatSubject.getValue(),
                        newMessage,
                    ]);
                } else {
                    // if receiver has the chat already opened
                    if (
                        this.currentChatSubject.getValue()?.id ==
                        newMessage.chatId
                    ) {
                        newMessage.seen = true;
                        this.updateMessages([
                            ...this.messagesPerChatSubject.getValue(),
                            newMessage,
                        ]);
                        this.updateUnseenMessagesBackend([newMessage]);
                    } else {
                        this.allMessagesSubject.next([
                            ...currentMessages,
                            newMessage,
                        ]);
                        this.updateUnseenMessagesCount();
                    }
                }

                this.updateLastMessageForChat(chatId, newMessage);
            }
        );

        this.activeChatSubscriptions.add(chatId);
    }

    private updateLastMessageForChat(chatId: number, message: Message): void {
        const currentLastMessages = this.lastMessagesSubject.getValue();
        const updatedLastMessages = {
            ...currentLastMessages,
            [chatId]: message,
        };
        this.lastMessagesSubject.next(updatedLastMessages);
    }

    disconnectWebSocket(): void {
        if (this.stompClient) {
            this.stompClient.disconnect(() => {
                console.log('WebSocket connection closed');
                this.stompClient = null;
                this.activeChatSubscriptions.clear();
            });
        }
    }

    updateMessages(updatedMessages: Message[]): void {
        this.messagesPerChatSubject.next(updatedMessages);

        const currentMessagesAll = this.allMessagesSubject.getValue();
        const updatedMessageAllList = currentMessagesAll.map((msg) => {
            const updatedMessage = updatedMessages.find(
                (updated) => updated.id === msg.id
            );
            return updatedMessage ? { ...msg, ...updatedMessage } : msg;
        });

        this.allMessagesSubject.next(updatedMessageAllList);
        this.messagesPerChatSubject.next(updatedMessages);
        this.updateUnseenMessagesCount();
    }

    private updateUnseenMessagesCount(): void {
        const messages = this.allMessagesSubject.getValue();
        const unseenCounts = new Map<number, number>();

        messages.forEach((message) => {
            if (!message.seen && message.senderId != this.loggedUser!.id) {
                unseenCounts.set(
                    message.chatId,
                    (unseenCounts.get(message.chatId) || 0) + 1
                );
            }
        });

        this.unseenMessagesPerChatSubject.next(unseenCounts);
    }

    sendMessage(chatId: number, content: string, senderId: number): void {
        if (this.stompClient && this.stompClient.connected) {
            const messagePayload = { chatId, content, senderId };
            this.stompClient.send(
                '/app/send',
                {},
                JSON.stringify(messagePayload)
            );
        } else {
            console.error('WebSocket is not connected.');
        }
    }

    setCurrentChat(chat: Chat | null): void {
        this.currentChatSubject.next(chat);
    }

    updateUnseenMessagesBackend(updatedMessageList: Message[]): void {
        this.http
            .put<void>(`${this.apiUrl}/messages/update`, updatedMessageList)
            .subscribe({
                next: () => {
                    console.log('Messages updated successfully.');
                },
                error: (err) => {
                    console.error('Failed to update messages:', err);
                    this.snackBar.open('Error fetching messages!', 'OK', {
                        duration: 3000,
                    });
                },
            });
    }

    getChats(userId: number): Observable<Chat[]> {
        return this.http.get<Chat[]>(`${this.apiUrl}/chats/${userId}`);
    }

    getMessages(chatId: number): Observable<Message[]> {
        return this.http.get<Message[]>(`${this.apiUrl}/messages/${chatId}`);
    }

    getLastMessageForChat(chatId: number): Observable<Message> {
        return this.http.get<Message>(`${this.apiUrl}/messages/last/${chatId}`);
    }

    createProductChat(productId: number): Observable<number> {
        return this.http.get<number>(
            `${this.apiUrl}/chat/create/product/${productId}`
        );
    }

    createServiceChat(serviceId: number): Observable<number> {
        return this.http.get<number>(
            `${this.apiUrl}/chat/create/service/${serviceId}`
        );
    }

    createEventChat(eventId: number): Observable<number> {
        return this.http.get<number>(
            `${this.apiUrl}/chat/create/event/${eventId}`
        );
    }
}
