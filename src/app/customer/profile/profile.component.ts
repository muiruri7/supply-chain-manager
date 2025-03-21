import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  avatarUrl: string = 'assets/default-avatar.png'; // Default avatar image
  passwordForm: FormGroup;
  passwordUpdated: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      email: ['customer@example.com', [Validators.required, Validators.email]],
      name: ['John Doe', Validators.required],
      phone: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      // Simulate updating profile
      alert('Profile updated successfully!');
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match!');
        return;
      }
      // Simulate password update
      this.passwordUpdated = true;
      alert('Password updated successfully!');
      this.passwordForm.reset();
    }
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
