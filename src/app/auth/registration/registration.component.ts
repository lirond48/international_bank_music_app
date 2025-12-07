import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      username: ['', [Validators.required, this.usernameValidator]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value as string;
    
    // Check if starts with a number
    if (/^\d/.test(value)) {
      return { startsWithNumber: true };
    }
    
    // Check if contains only English characters and numbers, no spaces
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(value)) {
      return { invalidUsername: true };
    }
    
    return null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value as string;
    const errors: ValidationErrors = {};
    
    // Check for spaces
    if (/\s/.test(value)) {
      errors['hasSpaces'] = true;
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
      errors['noUppercase'] = true;
    }
    
    // Check for at least one number
    if (!/\d/.test(value)) {
      errors['noNumber'] = true;
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
        this.setUserDetailsInStorage();
        this.router.navigate(['/music']);
    } else {
      Object.keys(this.registrationForm.controls).forEach(key => {
        this.registrationForm.get(key)?.markAsTouched();
      });
    }
  }

  private setUserDetailsInStorage() {
    const formValue = this.registrationForm.value;
    this.userService.saveUserData({
        email: formValue.email,
        username: formValue.username
      });
  }
}

