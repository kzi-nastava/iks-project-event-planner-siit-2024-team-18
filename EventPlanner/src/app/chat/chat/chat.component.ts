import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat, Message } from '../../models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];
  messages: Message[] = [];
  selectedChatId: number | null = null;
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadChats();
    this.chatService.initializeWebSocketConnection();
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

  loadMessages(chatId: number): void {
    this.selectedChatId = chatId;
    this.chatService.getMessages(chatId).subscribe({
      next: (data: Message[]) => {
        this.messages = data;
      },
      error: (err) => {
        console.error('Error fetching messages:', err);
      },
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedChatId !== null) {
      this.chatService.sendMessage(this.selectedChatId, this.newMessage).subscribe({
        next: (data: Message) => {
          this.messages.push(data);
          this.newMessage = '';
        },
        error: (err) => {
          console.error('Error sending messages:', err);
        },
      });
    }
  }
}
