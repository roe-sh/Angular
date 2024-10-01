import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private apiUrl = 'https://localhost:7227/api/Products';  
  constructor(private http: HttpClient) { }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
