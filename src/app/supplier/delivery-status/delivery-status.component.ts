import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Delivery {
  id: number;
  deliveryNumber: string;
  status: string;
  expectedDate: string;
}

@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.scss']
})
export class DeliveryStatusComponent implements OnInit {
  // Original full list of deliveries
  private deliveriesOriginal: Delivery[] = [
    { id: 1, deliveryNumber: 'DEL-1001', status: 'In Transit', expectedDate: '2025-04-01' },
    { id: 2, deliveryNumber: 'DEL-1002', status: 'Delivered', expectedDate: '2025-03-15' },
    { id: 3, deliveryNumber: 'DEL-1003', status: 'In Transit', expectedDate: '2025-04-05' },
    { id: 4, deliveryNumber: 'DEL-1004', status: 'Delayed', expectedDate: '2025-03-20' }
  ];

  // List to be displayed after filtering
  deliveries: Delivery[] = [];

  // Form for filtering/searching deliveries
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      status: [''],
      deliveryNumber: ['']
    });
  }

  ngOnInit(): void {
    // Initially display all deliveries
    this.deliveries = [...this.deliveriesOriginal];

    // Subscribe to changes on the filter form to update the list dynamically
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: { status: string; deliveryNumber: string }): void {
    this.deliveries = this.deliveriesOriginal.filter(delivery => {
      const matchesStatus = filters.status ? delivery.status.toLowerCase() === filters.status.toLowerCase() : true;
      const matchesNumber = filters.deliveryNumber 
        ? delivery.deliveryNumber.toLowerCase().includes(filters.deliveryNumber.toLowerCase()) 
        : true;
      return matchesStatus && matchesNumber;
    });
  }

  // Optional: a method to clear filters
  clearFilters(): void {
    this.filterForm.reset();
    this.deliveries = [...this.deliveriesOriginal];
  }
}
