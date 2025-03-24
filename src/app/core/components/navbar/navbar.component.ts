import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  notifications: Notification[] = [];
  showNotifications = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    // Subscribe to notifications
    this.notifService.notifications$.subscribe(notif => {
      this.notifications.push(notif);
    });
    
    // Optionally, start simulated notifications:
    this.notifService.simulateNotification();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
