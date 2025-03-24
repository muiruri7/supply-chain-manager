import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService, User } from '../../core/services/user.service';

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
    this.addUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    this.editUserForm = this.fb.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  // Getters for the edit form controls
  get editEmailControl(): FormControl {
    return this.editUserForm.get('email') as FormControl;
  }

  get editRoleControl(): FormControl {
    return this.editUserForm.get('role') as FormControl;
  }

  onAddUser(): void {
    if (this.addUserForm.valid) {
      const newUser: User = this.addUserForm.value;
      this.userService.addUser(newUser);
      this.addUserForm.reset();
    }
  }

  onEditUser(user: User): void {
    this.editingUser = user;
    this.editUserForm.patchValue(user);
  }

  onSaveEdit(): void {
    if (this.editUserForm.valid && this.editingUser) {
      const updatedUser: User = this.editUserForm.value;
      this.userService.updateUser(updatedUser);
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingUser = null;
    this.editUserForm.reset();
  }

  onDeleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId);
    }
  }
}
