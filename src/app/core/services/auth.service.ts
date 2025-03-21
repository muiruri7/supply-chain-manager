import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'scm_user';

  // Simulated login - in a real app, you'd call an API here.
  login(email: string, password: string, role: string, rememberMe: boolean = false): boolean {
    // For our demo purposes, we'll accept any credentials.
    const userData = { email, role };
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.storageKey, JSON.stringify(userData));
    return true;
  }

  // Simulated registration.
  register(email: string, password: string, role: string): boolean {
    // Save the user data in localStorage for demo purposes.
    // In a real app, this data would be sent to a backend.
    const userData = { email, role };
    localStorage.setItem(this.storageKey, JSON.stringify(userData));
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.storageKey);
  }

  getUser(): any {
    const userData = localStorage.getItem(this.storageKey) || sessionStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
