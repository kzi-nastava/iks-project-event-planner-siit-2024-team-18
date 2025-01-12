import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat, Message } from '../../models/chat.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  chats: Chat[] = [];
  messages: Message[] = [];
  selectedChatId: number | null = null;
  newMessage: string = '';
  loggedUser: User | null = null;

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadChats();
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.chatService.disconnectWebSocket();
  }

  loadChats(): void {
    this.chatService.getChats().subscribe({
      next: (data: Chat[]) => {
        this.chats = data;
      },
      error: (err) => {
        console.error('Error fetching chats:', err);
      },
    });
  }

  loadUser(): void {
    this.userService.getLoggedUser().subscribe({
      next: (data: User) => {
        this.loggedUser = data;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });
  }

  loadMessages(chatId: number): void {
    if (this.selectedChatId !== chatId) {
      this.chatService.disconnectWebSocket();
    }

    this.selectedChatId = chatId;
    this.chatService.initializeWebSocketConnection(chatId);

    this.chatService.getMessages(chatId).subscribe({
      next: (data: Message[]) => {
        this.messages = data;
      },
      error: (err) => {
        console.error('Error fetching messages:', err);
      },
    });

    this.chatService.messages$.subscribe({
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
}
