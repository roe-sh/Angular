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

  private apiUrl = 'https://localhost:7227/api/Users'; 

  constructor(private http: HttpClient) { } 

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);  
  }
}
