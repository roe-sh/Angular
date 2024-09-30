import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService, Product } from '../services/product-details.service';  // Adjust paths as needed
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductDetailsService
  ) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: Product) => {
          this.product = data;
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  // Function to show SweetAlert when adding a product to the cart
  addToCart(product: Product | undefined): void {
    if (product) {
      // You can trigger any cart-related logic here (e.g., adding to cart service)

      // Show SweetAlert
      Swal.fire({
        title: 'Added to Cart!',
        text: `${product.productName} has been added to your cart.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  }
}
