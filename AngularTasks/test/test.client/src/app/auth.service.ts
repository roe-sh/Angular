import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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


  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };

  
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        localStorage.setItem('token', response.token);  
        localStorage.setItem('user', JSON.stringify(response.user)); 
        return response;
      }),
      catchError(error => {
        
        throw error;
      })
    );
  }



  register(username: string, email: string, password: string): Observable<any> {
    const registerData = { username, email, password };

   
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
      
        console.error('Registration error:', error);
        throw error;
      })
    );
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  
  getUserDetails(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

 
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
