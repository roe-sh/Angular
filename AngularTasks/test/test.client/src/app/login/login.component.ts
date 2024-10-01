import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';  
import { Router } from '@angular/router';  
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful:', response);
         
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Login failed:', error);
       
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'The email or password is incorrect, or the user is not registered.',
            confirmButtonText: 'Try Again'
          });
        }
      );
    }
  }
}
