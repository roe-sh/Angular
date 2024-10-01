import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';

export interface User {
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7227/api/Users';  // Replace with actual API URL

  constructor(private http: HttpClient) { }  // Inject HttpClient

  // Method to fetch users from the API
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);  // Make a GET request to the API
  }
}
