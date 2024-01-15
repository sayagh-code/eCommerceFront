import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CartService } from '../../services/cart.service';
import { RecommendationSystemService } from '../../services/recommendation-system.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products! : Array<Product>;
  categories! : Category[];
  top3 : Product[] = [];
  
  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private recommendedProducts: RecommendationSystemService
  ){}

  ngOnInit(): void {
    this.handleGetAllProducts();
    this.handleGetAllCategories();
    this.handleGetRecommendedProducts();
  }

  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) =>{
        this.products=[...data._embedded.products];
        this.recommendedProducts.recommendProductsByUser().subscribe({
          next: (v)=>{
            console.log(v.prediction);
            for(let i=0;i<3;i++){
              this.top3.push(this.products.find((p)=>p.id==v.prediction[i])!)
            }
          }
        })
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

  handleGetRecommendedProducts(){
    
  }
}
