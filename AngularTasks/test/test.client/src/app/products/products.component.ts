import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute to get route parameters
import { ProductService, Product } from '../services/product.service';  // Ensure correct path to ProductService

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];  // Array to store fetched products
  categoryId: number | null = null;  // Store categoryId from route

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  // Fetch products when the component initializes
  ngOnInit(): void {
    // Get the categoryId from the route parameters
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryId'));  // Get categoryId from route parameter
      if (this.categoryId) {
        // Fetch products for the given categoryId
        this.productService.getProductsByCategory(this.categoryId).subscribe(
          (data) => {
            this.products = data;  // Assign the fetched products to the array
          },
          (error) => {
            console.error('Error fetching products:', error);  // Handle any errors
          }
        );
      }
    });
  }
}
