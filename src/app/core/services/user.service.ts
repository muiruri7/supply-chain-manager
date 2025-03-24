import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  role: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'scm_users';
  private users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  
  users$: Observable<User[]> = this.usersSubject.asObservable();

  getUsers(): User[] {
    return this.users;
  }

  private updateStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    this.usersSubject.next([...this.users]);
  }

  addUser(user: User): void {
    user.id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push(user);
    this.updateStorage();
  }

  updateUser(updatedUser: User): void {
    this.users = this.users.map(u => u.id === updatedUser.id ? updatedUser : u);
    this.updateStorage();
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(u => u.id !== userId);
    this.updateStorage();
  }
}