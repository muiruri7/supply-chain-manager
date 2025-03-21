import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Simulated initial users
  private users: User[] = [
    { id: 1, email: 'admin@example.com', role: 'Admin' },
    { id: 2, email: 'user1@example.com', role: 'Customer' },
    { id: 3, email: 'manager@example.com', role: 'Warehouse Manager' }
  ];

  // BehaviorSubject to allow components to subscribe to user updates
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  // Observable of users
  users$: Observable<User[]> = this.usersSubject.asObservable();

  // Get the current list of users
  getUsers(): User[] {
    return [...this.users];
  }

  // Add a new user
  addUser(user: User): void {
    // Assign a new id (simple simulation)
    user.id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push(user);
    this.usersSubject.next(this.getUsers());
  }

  // Update an existing user
  updateUser(updatedUser: User): void {
    this.users = this.users.map(u => u.id === updatedUser.id ? updatedUser : u);
    this.usersSubject.next(this.getUsers());
  }

  // Delete a user
  deleteUser(userId: number): void {
    this.users = this.users.filter(u => u.id !== userId);
    this.usersSubject.next(this.getUsers());
  }
}
