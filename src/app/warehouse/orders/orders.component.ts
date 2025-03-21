import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  assignedWarehouse: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [
    { id: 1, orderNumber: 'ORD-1001', status: 'Pending', assignedWarehouse: 'Warehouse 1' },
    { id: 2, orderNumber: 'ORD-1002', status: 'Processing', assignedWarehouse: 'Warehouse 2' }
  ];

  addOrderForm: FormGroup;
  editOrderForm: FormGroup;
  editingOrder: Order | null = null;

  constructor(private fb: FormBuilder) {
    // Form for adding a new order
    this.addOrderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      status: ['', Validators.required],
      assignedWarehouse: ['', Validators.required]
    });

    // Form for editing an order
    this.editOrderForm = this.fb.group({
      id: [''],
      orderNumber: ['', Validators.required],
      status: ['', Validators.required],
      assignedWarehouse: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Getter for orderNumber control in the edit form
  get editOrderNumber(): FormControl {
    return this.editOrderForm.get('orderNumber') as FormControl;
  }

  // Getter for status control in the edit form
  get editStatus(): FormControl {
    return this.editOrderForm.get('status') as FormControl;
  }

  // Getter for assignedWarehouse control in the edit form
  get editAssignedWarehouse(): FormControl {
    return this.editOrderForm.get('assignedWarehouse') as FormControl;
  }

  // Add a new order
  onAddOrder(): void {
    if (this.addOrderForm.valid) {
      const newOrder: Order = {
        id: this.orders.length ? Math.max(...this.orders.map(o => o.id)) + 1 : 1,
        ...this.addOrderForm.value
      };
      this.orders.push(newOrder);
      this.addOrderForm.reset();
    }
  }

  // Enable editing mode for an order
  onEditOrder(order: Order): void {
    this.editingOrder = order;
    this.editOrderForm.patchValue(order);
  }

  // Save changes after editing
  onSaveEdit(): void {
    if (this.editOrderForm.valid && this.editingOrder) {
      const updatedOrder: Order = this.editOrderForm.value;
      const index = this.orders.findIndex(o => o.id === updatedOrder.id);
      if (index !== -1) {
        this.orders[index] = updatedOrder;
      }
      this.cancelEdit();
    }
  }

  // Cancel editing mode
  cancelEdit(): void {
    this.editingOrder = null;
    this.editOrderForm.reset();
  }

  // Delete an order
  onDeleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orders = this.orders.filter(o => o.id !== orderId);
    }
  }
}
