
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Category {
  id: number;
  name: string;
  description: string;
}
@Injectable({
  providedIn: 'root'  
})


export class CategoryService {
  private apiUrl = 'https://localhost:7227/api/Categories'; 

  constructor(private http: HttpClient) { }

  // Method to fetch all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
