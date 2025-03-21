import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

interface InventoryItem {
  id: number;
  productName: string;
  quantity: number;
  location: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventoryItems: InventoryItem[] = [
    { id: 1, productName: 'Widget A', quantity: 150, location: 'Warehouse 1' },
    { id: 2, productName: 'Widget B', quantity: 85, location: 'Warehouse 2' }
  ];

  addItemForm: FormGroup;
  editItemForm: FormGroup;
  editingItem: InventoryItem | null = null;

  constructor(private fb: FormBuilder) {
    // Form for adding a new inventory item
    this.addItemForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required]
    });

    // Form for editing an inventory item
    this.editItemForm = this.fb.group({
      id: [''],
      productName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Getter for productName control in the edit form
  get editProductName(): FormControl {
    return this.editItemForm.get('productName') as FormControl;
  }

  // Getter for quantity control in the edit form
  get editQuantity(): FormControl {
    return this.editItemForm.get('quantity') as FormControl;
  }

  // Getter for location control in the edit form
  get editLocation(): FormControl {
    return this.editItemForm.get('location') as FormControl;
  }

  // Add a new inventory item
  onAddItem(): void {
    if (this.addItemForm.valid) {
      const newItem: InventoryItem = {
        id: this.inventoryItems.length
          ? Math.max(...this.inventoryItems.map(item => item.id)) + 1
          : 1,
        ...this.addItemForm.value
      };
      this.inventoryItems.push(newItem);
      this.addItemForm.reset();
    }
  }

  // Enable editing mode for an item
  onEditItem(item: InventoryItem): void {
    this.editingItem = item;
    this.editItemForm.patchValue(item);
  }

  // Save changes after editing
  onSaveEdit(): void {
    if (this.editItemForm.valid && this.editingItem) {
      const updatedItem: InventoryItem = this.editItemForm.value;
      const index = this.inventoryItems.findIndex(i => i.id === updatedItem.id);
      if (index !== -1) {
        this.inventoryItems[index] = updatedItem;
      }
      this.cancelEdit();
    }
  }

  // Cancel edit mode
  cancelEdit(): void {
    this.editingItem = null;
    this.editItemForm.reset();
  }

  // Delete an inventory item
  onDeleteItem(itemId: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryItems = this.inventoryItems.filter(item => item.id !== itemId);
    }
  }
}
