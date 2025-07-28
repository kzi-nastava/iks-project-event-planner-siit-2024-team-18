import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Chat, Message } from '../../models/chat.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  private messagesSubscription: Subscription | null = null;
  private chatSubscription: Subscription | null = null;
  
  chats: Chat[] = [];
  filteredChats: Chat[] = [];
  messages: Message[] = [];
  unseenMessagesPerChat = new Map<number, number>();
  usersMap: Map<number, User> = new Map();
  lastMessages: { [chatId: number]: Message | undefined } = {}; 
  selectedChatId: number | null = null;
  loggedUser: User | null = null;
  unseenMessagesCount: number = 0;
  newMessage: string = '';
  searchQuery: string = '';

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.chatService.setCurrentChat({ id: -1, user1: -1, user2: -1, isDeleted: false });
  }

  ngOnInit(): void {
    this.loadData();

    this.chatService.unseenMessagesPerChat$.subscribe((unseenCounts) => {
      this.unseenMessagesPerChat = unseenCounts;
    });
  
    this.chatService.lastMessages$.subscribe((updatedLastMessages) => {
      this.lastMessages = updatedLastMessages;
      this.sortChatsByLastMessage();
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
        this.snackBar.open('Error fetching user!', 'OK', {
          duration: 3000,
        });
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        users.forEach(user => {
          this.usersMap.set(user.id, user);
        });
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.snackBar.open('Error fetching users!', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  loadChats(): void {
    this.chatService.getChats(this.loggedUser!.id).subscribe({
      next: (data: Chat[]) => {
        this.chats = data;
        this.filteredChats = [...this.chats];
        
        const fetchPromises = this.chats.map((chat) =>
          this.chatService.getLastMessageForChat(chat.id).toPromise()
        );
        
        Promise.all(fetchPromises).then((lastMessages) => {
          lastMessages.forEach((message, index) => {
            const chatId = this.chats[index].id;
              this.lastMessages[chatId] = message || { id: -1, content: "Start chatting!", seen: true, chatId, date: new Date(), isDeleted: false, senderId: -1 };
            });
    
            this.sortChatsByLastMessage();
        });
      },
      error: (err) => {
        console.error('Error fetching chats:', err);
        this.snackBar.open('Error fetching chats!', 'OK', {
          duration: 3000,
        });
      },
    });
  }
  
  filterChats(): void {
    const query = this.searchQuery.toLowerCase();
  
    this.filteredChats = this.chats.filter(chat => {
      const user1 = this.usersMap.get(chat.user1);
      const user2 = this.usersMap.get(chat.user2);
  
      const fullName1 = user1 ? `${user1.firstName} ${user1.lastName}`.toLowerCase() : '';
      const fullName2 = user2 ? `${user2.firstName} ${user2.lastName}`.toLowerCase() : '';
  
      return fullName1.includes(query) || fullName2.includes(query);
    });
  }
  
  
  loadMessages(chatId: number): void {
    this.unsubscribeMessages();
    this.selectedChatId = chatId;
    const selectedChat = this.chats.find(chat => chat.id === chatId) || null;

    this.chatService.setCurrentChat(selectedChat);
  
    if (!this.chatService.activeChatSubscriptions.has(chatId)) {
      this.chatService.subscribeToChat(chatId);
    }

    this.chatSubscription = this.chatService.getMessages(chatId).subscribe({
      next: (data: Message[]) => {
        this.messages = data;

        this.messages.sort((a, b) => b.id - a.id);

        const updatedMessages = this.messages.map((m) =>
          m.chatId === chatId && m.senderId !== this.loggedUser?.id ? { ...m, seen: true } : m
        );
        this.chatService.updateMessages(updatedMessages);
        this.chatService.updateUnseenMessagesBackend(updatedMessages);
      },
      error: (err) => {
        console.error('Error fetching messages:', err);
        this.snackBar.open('Error fetching messages!', 'OK', {
          duration: 3000,
        }); 
      },
    });

    // listen to messages send by recipient
    this.messagesSubscription = this.chatService.messagesPerChat$.subscribe({
      next: (newMessages: Message[]) => {
        this.messages = [...this.messages, ...newMessages.filter(m => 
          !this.messages.some(existing => existing.id === m.id)
        )];
        this.messages.sort((a, b) => b.id - a.id);
      },
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedChatId !== null) {
      this.chatService.sendMessage(this.selectedChatId, this.newMessage, this.loggedUser!.id);
      this.newMessage = '';
    }
  }

  isOwnMessage(message: Message): boolean {
    return message.senderId === this.loggedUser?.id;
  }

  getUnseenMessageCount(chatId: number): number {
    return this.unseenMessagesPerChat.get(chatId) || 0;
  }

  sortChatsByLastMessage(): void {
    this.chats.sort((a, b) => {
      const lastMessageIdA = this.lastMessages[a.id]!.id;
      const lastMessageIdB = this.lastMessages[b.id]!.id;
  
      return lastMessageIdB - lastMessageIdA;
    });

    this.filteredChats.sort((a, b) => {
      const lastMessageIdA = this.lastMessages[a.id]!.id;
      const lastMessageIdB = this.lastMessages[b.id]!.id;
  
      return lastMessageIdB - lastMessageIdA;
    });
  }

  formatDateOrTime(date: Date): string {
    if (!date) return '';
    const now = new Date();
    const parsedDate = new Date(date);
  
    const oneDay = 24 * 60 * 60 * 1000;
    const isOlderThanOneDay = (now.getTime() - parsedDate.getTime()) > oneDay;
  
    if (isOlderThanOneDay) {
      return parsedDate.toLocaleDateString();
    } else {
      return parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
  }

  getUserFullName(userId: number): string {
    const user = this.usersMap.get(userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  }

  getUserPicture(userId: number): string {
    const user = this.usersMap.get(userId);
    return user!.image!;
  }

  getUserPictureInChat(chatId: number): string {
    let currentChat: Chat;
    this.filteredChats.forEach(chat => {
      if (chat.id == chatId) {
        currentChat = chat;
        return;
      }
    });

    return this.usersMap.get(this.loggedUser!.id !== currentChat!.user1 ? currentChat!.user1 : currentChat!.user2)!.image!;
  }

  goToUserProfile(chatId: number) {
    let currentChat: Chat;
    this.filteredChats.forEach(chat => {
      if (chat.id == chatId) {
        currentChat = chat;
        return;
      }
    });

    const recipient = this.usersMap.get(this.loggedUser!.id !== currentChat!.user1 ? currentChat!.user1 : currentChat!.user2)!;
    this.router.navigate(['/users/profile/', recipient.id]);
  }

  getUserInChat(chatId: number): string {
    let currentChat: Chat;
    this.filteredChats.forEach(chat => {
      if (chat.id == chatId) {
        currentChat = chat;
        return;
      }
    });

    return this.getUserFullName(this.loggedUser!.id !== currentChat!.user1 ? currentChat!.user1 : currentChat!.user2);
  }

  private unsubscribeMessages(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
      this.messagesSubscription = null;
    }

    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
      this.chatSubscription = null;
    }
  }
}
