import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define the structure of the login response
interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7227/api/Users';

  constructor(private http: HttpClient) { }

  // Method to login the user by sending credentials to the API
  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };

    // Call the API login endpoint
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        // Here you could store the user token or user details in localStorage/sessionStorage
        localStorage.setItem('token', response.token);  // Store token
        localStorage.setItem('user', JSON.stringify(response.user));  // Store user details
        return response;
      }),
      catchError(error => {
        // Handle login errors here (you can log, notify the user, etc.)
        throw error;
      })
    );
  }

  // Other methods omitted for brevity...

  // Method to register a user (optional if you want to handle registration here too)
  register(username: string, email: string, password: string): Observable<any> {
    const registerData = { username, email, password };

    // Call the API register endpoint
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Handle registration errors
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  // Logout the user by clearing session or local storage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Check if user is authenticated (e.g., by checking if a token exists)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;  // Token exists, the user is authenticated
  }

  // Optionally, get the logged-in user details (if stored)
  getUserDetails(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Optional: Method to retrieve the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
