import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

interface PurchaseOrder {
  id: number;
  orderNumber: string;
  supplier: string;
  status: string;
}

@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [
    { id: 1, orderNumber: 'PO-1001', supplier: 'Supplier A', status: 'Pending' },
    { id: 2, orderNumber: 'PO-1002', supplier: 'Supplier B', status: 'Confirmed' }
  ];

  addOrderForm: FormGroup;
  editOrderForm: FormGroup;
  editingOrder: PurchaseOrder | null = null;

  constructor(private fb: FormBuilder) {
    this.addOrderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      supplier: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.editOrderForm = this.fb.group({
      id: [''],
      orderNumber: ['', Validators.required],
      supplier: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Getter for inline editing controls
  get editOrderNumber(): FormControl {
    return this.editOrderForm.get('orderNumber') as FormControl;
  }

  get editSupplier(): FormControl {
    return this.editOrderForm.get('supplier') as FormControl;
  }

  get editStatus(): FormControl {
    return this.editOrderForm.get('status') as FormControl;
  }

  onAddOrder(): void {
    if (this.addOrderForm.valid) {
      const newOrder: PurchaseOrder = {
        id: this.purchaseOrders.length ? Math.max(...this.purchaseOrders.map(o => o.id)) + 1 : 1,
        ...this.addOrderForm.value
      };
      this.purchaseOrders.push(newOrder);
      this.addOrderForm.reset();
    }
  }

  onEditOrder(order: PurchaseOrder): void {
    this.editingOrder = order;
    this.editOrderForm.patchValue(order);
  }

  onSaveEdit(): void {
    if (this.editOrderForm.valid && this.editingOrder) {
      const updatedOrder: PurchaseOrder = this.editOrderForm.value;
      const index = this.purchaseOrders.findIndex(o => o.id === updatedOrder.id);
      if (index !== -1) {
        this.purchaseOrders[index] = updatedOrder;
      }
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingOrder = null;
    this.editOrderForm.reset();
  }

  onDeleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this purchase order?')) {
      this.purchaseOrders = this.purchaseOrders.filter(o => o.id !== orderId);
    }
  }
}
