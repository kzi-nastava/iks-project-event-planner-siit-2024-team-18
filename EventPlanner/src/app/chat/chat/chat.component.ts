import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat, Message } from '../../models/chat.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];
  unseenMessagesPerChat = new Map<number, number>();
  messages: Message[] = [];
  selectedChatId: number | null = null;
  newMessage: string = '';
  loggedUser: User | null = null;
  unseenMessagesCount: number = 0;
  lastMessages: { [chatId: number]: Message | undefined } = {}; 

  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.chatService.unseenMessagesPerChat$.subscribe((unseenCounts) => {
      this.unseenMessagesPerChat = unseenCounts;
    });
  
    this.chatService.lastMessages$.subscribe((updatedLastMessages) => {
      this.lastMessages = updatedLastMessages;
    });
  }

  loadData(): void {
    this.userService.getLoggedUser().subscribe({
      next: (data: User) => {
        this.loggedUser = data;
        this.loadChats();
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });
  }

  loadChats(): void {
    this.chatService.getChats(this.loggedUser!.id).subscribe({
      next: (data: Chat[]) => {
        this.chats = data;
  
        this.chats.forEach((chat) => {
          this.chatService.getLastMessageForChat(chat.id).subscribe({
            next: (lastMessage: Message) => {
              const message: Message = lastMessage || { id: -1, content: "Start chatting!", seen: true, chatId: chat.id, isDeleted: false, senderUsername: "Auto" };
              
              this.lastMessages[chat.id] = message;
  
              this.chatService.updateLastMessagesForChat(chat.id, message);
            },
            error: (err) => {
              console.error(`Error fetching last message for chat ${chat.id}:`, err);
            },
          });
        });
      },
      error: (err) => {
        console.error('Error fetching chats:', err);
      },
    });
  }
  
  loadMessages(chatId: number): void {
    this.selectedChatId = chatId;

    this.chatService.getMessages(chatId).subscribe({
      next: (data: Message[]) => {
        this.messages = data;
        const updatedMessages = this.messages.map((m) =>
          m.chatId === chatId && m.senderUsername !== this.loggedUser?.firstName ? { ...m, seen: true } : m
        );
        this.chatService.updateMessages(updatedMessages);
      },
      error: (err) => {
        console.error('Error fetching messages:', err);
      },
    });

    // listen to messages send by recipient
    this.chatService.messagesPerChat$.subscribe({
      next: (newMessages: Message[]) => {
        this.messages = [...this.messages, ...newMessages.filter(m => 
          !this.messages.some(existing => existing.id === m.id)
        )];
      },
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedChatId !== null) {
      this.chatService.sendMessage(this.selectedChatId, this.newMessage, this.loggedUser!.firstName);
      this.newMessage = '';
    }
  }

  isOwnMessage(message: Message): boolean {
    return message.senderUsername === this.loggedUser?.firstName;
  }

  getUnseenMessageCount(chatId: number): number {
    return this.unseenMessagesPerChat.get(chatId) || 0;
  }
}
