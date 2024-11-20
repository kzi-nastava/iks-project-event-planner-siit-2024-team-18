import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const USERS = [
  {
    _id: 1,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Event Organizer',
    address: '123 Main St, Cityville',
    phoneNumber: '1234567890',
    companyName: '',
    profilePhoto: 'https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg',
    description: '',
    categories: [],
    eventTypes: [],
    password: 'password123',
    confirmPassword: 'password123',
  },
  {
    _id: 2,
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'Service Product Provider',
    companyName: 'Tech Innovations Ltd.',
    profilePhoto: 'https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=',
    address: '456 Oak Rd, Townsville',
    phoneNumber: '9876543210',
    description: 'Providing top-notch tech services for businesses.',
    categories: ['Software', 'Consulting'],
    eventTypes: ['Tech Talks', 'Product Launches'],
    password: 'securepass456',
    confirmPassword: 'securepass456',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor() {
    for (let userObj of USERS) {
      const user: User = {
        _id: userObj._id,
        email: userObj.email,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        role: userObj.role,
        companyName: userObj.companyName,
        profilePhoto: userObj.profilePhoto,
        address: userObj.address,
        phoneNumber: userObj.phoneNumber,
        description: userObj.description,
        categories: userObj.categories,
        eventTypes: userObj.eventTypes,
        password: userObj.password,
      };
      this.users.push(user);
    }
  }

  getAll(): User[] {
    return this.users;
  }

  add(user: User): void {
    this.users.push(user);
  }

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    return user ? user : null;
  }

  signup(user: User): boolean {
    const existingUser = this.users.find(u => u.email === user.email);
    if (existingUser) {
      return false;
    }
    this.add(user);
    return true;
  }
}
