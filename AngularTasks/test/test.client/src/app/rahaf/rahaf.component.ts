import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rahaf',
  templateUrl: './rahaf.component.html',
  styleUrls: ['./rahaf.component.css']
})
export class RahafComponent implements OnInit {

  param: number | null = null;   // Category ID parameter from the route
  array: any[] = [];             // Array to hold fetched products

  constructor(
    private _ser: ProductService,  // Injecting ProductService
    private _route: ActivatedRoute,  // Injecting ActivatedRoute to access route params
    private _router: Router         // Injecting Router for navigation
  ) { }

  ngOnInit() {
    // Get category ID from the route parameter
    const idParam = this._route.snapshot.paramMap.get('id');
    this.param = idParam ? +idParam : null;  // Convert to number

    if (this.param !== null) {
      this.getbatool();  // Fetch products if valid category ID is provided
    } else {
      console.error('Invalid category ID.');
    }
  }

  // Method to fetch products by category
  getbatool() {
    if (this.param !== null) {
      this._ser.getProductsByCategory(this.param).subscribe(
        (data) => {
          this.array = data;
          console.log(this.array);  // Log the fetched products
        },
        (error) => {
          console.error('Error fetching products:', error);  // Handle errors
        }
      );
    }
  }

  // Method to view product details by navigating to the product details page
  onViewDetails(product: any): void {
    console.log('Viewing details for product:', product);
    this._router.navigate(['/product', product.id]);  // Navigate to the product details page
  }

  // Optional: Handle "Add to Cart" action
  onAddToCart(product: any): void {
    console.log(`Adding ${product.productName} to cart.`);
    // Add cart functionality here (e.g., calling cart service)
  }
}
