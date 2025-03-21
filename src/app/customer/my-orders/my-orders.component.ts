import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  orderDate: string;
}

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [
    { id: 1, orderNumber: 'CUST-ORD-001', status: 'Delivered', orderDate: '2025-03-10' },
    { id: 2, orderNumber: 'CUST-ORD-002', status: 'Processing', orderDate: '2025-03-15' },
    { id: 3, orderNumber: 'CUST-ORD-003', status: 'Shipped', orderDate: '2025-03-20' },
    // ... more orders for pagination
  ];

  filteredOrders: Order[] = [];
  filterForm: FormGroup;
  sortField: 'orderNumber' | 'orderDate' = 'orderNumber';
  sortDirection: 'asc' | 'desc' = 'asc';
  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      status: [''],
      search: ['']
    });
  }

  ngOnInit(): void {
    // Initially, display all orders
    this.filteredOrders = [...this.orders];
    this.calculateTotalPages();

    // Subscribe to changes on the filter form to update filtered orders
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: { status: string; search: string }): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = filters.status ? order.status.toLowerCase() === filters.status.toLowerCase() : true;
      const matchesSearch = filters.search 
        ? order.orderNumber.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      return matchesStatus && matchesSearch;
    });
    this.currentPage = 1; // Reset to first page
    this.calculateTotalPages();
  }

  applySorting(): void {
    this.filteredOrders.sort((a, b) => {
      const fieldA = a[this.sortField].toLowerCase();
      const fieldB = b[this.sortField].toLowerCase();
      if (fieldA < fieldB) return this.sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onSort(field: 'orderNumber' | 'orderDate'): void {
    if (this.sortField === field) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  sortOrders(by: 'orderNumber' | 'orderDate'): void {
    this.filteredOrders.sort((a, b) => a[by].localeCompare(b[by]));
  }

  // Simple client-side pagination calculations
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredOrders.length / this.pageSize);
  }

  get pagedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredOrders.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filteredOrders = [...this.orders];
    this.currentPage = 1;
    this.calculateTotalPages();
    this.applySorting();
  }
}
