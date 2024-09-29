import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../services/category.service';  // Correct import for Category

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  viewCategoryProducts(categoryId: number): void {
    // Navigate or perform action to view products by category
  }
}
