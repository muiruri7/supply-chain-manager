import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;
  // Placeholder metrics for future enhancements.
  totalInventoryItems: number = 0;
  totalOrders: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Subscribe to the user data to update the total users count.
    this.userService.users$.subscribe(users => {
      this.totalUsers = users.length;
    });

    // In a real app, you would fetch the inventory and order metrics here.
    // For now, we'll initialize them to zero.
    this.totalInventoryItems = 0;
    this.totalOrders = 0;
  }
}
