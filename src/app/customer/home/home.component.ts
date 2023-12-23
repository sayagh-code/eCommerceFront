import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products! : Array<Product>;
  categories! : Category[];
  
  constructor(private productService: ProductService, private categoryService: CategoryService){}

  ngOnInit(): void {
    this.handleGetAllProducts();
    this.handleGetAllCategories();
  }

  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) =>{
        this.products=[...data._embedded.products];
      }
    });
  }

  handleGetAllCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (data) =>{
        this.categories=[...data._embedded.categories];
      }
    });
  }

  handleGetProductsByCategory(category: string){
    if(category!="All")
    {
      this.productService.getProductsByCategory(category).subscribe({
        next: (data)=>{
          this.products=[...data._embedded.products];
        }
      })
    }else{
      this.handleGetAllProducts();
    }
  }

  filterPrice(price: number){
    this.productService.getAllProducts().subscribe({
      next: (data) =>{
        this.products=data._embedded.products.filter((item: any)=>{return item.price<price && item.price>=price/10});
      }
    });
  }
}
