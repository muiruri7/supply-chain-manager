import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  // Observable stream for notifications
  notifications$: Observable<Notification> = this.notificationSubject.asObservable();

  // Emit a new notification
  notify(notification: Notification): void {
    this.notificationSubject.next(notification);
  }

  // For demo purposes: simulate a notification after a delay
  simulateNotification(): void {
    setTimeout(() => {
      this.notify({
        type: 'warning',
        message: 'Low inventory alert for Widget A!',
        timestamp: new Date()
      });
    }, 5000);
  }
}
