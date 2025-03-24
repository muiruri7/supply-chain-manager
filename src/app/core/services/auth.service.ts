import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Key for storing the array of registered users
  private registeredUsersKey = 'scm_users';
  // Key for storing the currently logged-in user
  private currentUserStorageKey = 'scm_user';

  // Simulated login: compares the entered password with the stored password.
  login(email: string, password: string, rememberMe: boolean = false): boolean {
    // Retrieve the array of registered users
    const registeredUsers = JSON.parse(localStorage.getItem(this.registeredUsersKey) || '[]');
    // Find the user by email
    const user = registeredUsers.find((u: any) => u.email === email);
    if (user && user.password === password) {
      // Remove the password before storing the current user data for security
      const { password, ...userWithoutPassword } = user;
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(this.currentUserStorageKey, JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  }

  // Simulated registration: adds the new user to the registered users array.
  register(email: string, password: string, role: string): boolean {
    // Retrieve the current array of registered users (or empty array if none exist)
    const registeredUsers = JSON.parse(localStorage.getItem(this.registeredUsersKey) || '[]');
    
    // Optionally, check if a user with the same email already exists
    if (registeredUsers.some((u: any) => u.email === email)) {
      return false; // Registration fails if email is already registered
    }
    
    const newUser = { email, password, role };
    registeredUsers.push(newUser);
    localStorage.setItem(this.registeredUsersKey, JSON.stringify(registeredUsers));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserStorageKey);
    sessionStorage.removeItem(this.currentUserStorageKey);
  }

  getUser(): any {
    const userData = localStorage.getItem(this.currentUserStorageKey) || sessionStorage.getItem(this.currentUserStorageKey);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
