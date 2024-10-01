import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],  // Changed to 'username'
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator  // Add custom validator for password matching
    });
  }

  // Custom validator to check if password and confirmPassword fields match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };

      // Call API to register the user with only necessary fields
      this.http.post('https://localhost:7227/api/Users/register', formData)
        .subscribe(response => {
          console.log('Registration successful:', response);
        }, error => {
          console.error('Registration failed:', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
