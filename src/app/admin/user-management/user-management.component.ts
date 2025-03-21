import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  addUserForm: FormGroup;
  editingUser: User | null = null;
  editUserForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    // Form for adding a new user
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    // Form for editing a user
    this.editUserForm = this.fb.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Subscribe to user data changes
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  // Add new user
  onAddUser(): void {
    if (this.addUserForm.valid) {
      const newUser: User = this.addUserForm.value;
      this.userService.addUser(newUser);
      this.addUserForm.reset();
    }
  }

  // Start editing a user
  onEditUser(user: User): void {
    this.editingUser = user;
    this.editUserForm.patchValue(user);
  }

  // Save the edited user
  onSaveEdit(): void {
    if (this.editUserForm.valid) {
      const updatedUser: User = this.editUserForm.value;
      this.userService.updateUser(updatedUser);
      this.cancelEdit();
    }
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingUser = null;
    this.editUserForm.reset();
  }

  // Delete a user
  onDeleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId);
    }
  }

  get editEmailControl(): FormControl {
    return this.editUserForm.get('email') as FormControl;
  }
  
  get editRoleControl(): FormControl {
    return this.editUserForm.get('role') as FormControl;
  }
}
