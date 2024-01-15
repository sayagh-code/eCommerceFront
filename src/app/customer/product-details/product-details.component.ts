import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { CartService } from '../../services/cart.service';
import { RecommendationSystemService } from '../../services/recommendation-system.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product! : Product;
  id! : string;
  recommendedProducts!: Product[];

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private productRecommendation: RecommendationSystemService
  ){}

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.loadData();
    this.cartService.getCart();
  }

  loadData(){
    this.productService.getProductById(this.id).subscribe({
      next: (prod)=>{
        this.product={
          id:prod.id,
          name:prod.name,
          description:prod.description,
          price:prod.price,
          quantity:prod.quantity,
          category:{id:prod._embedded.category.id,nameCat:prod._embedded.category.nameCat},
          image:prod.image
        };
        this.productRecommendation.recommendProducts(this.product.name).subscribe({
          next: (n)=>{
            this.recommendedProducts=n.prediction;
          }
        });
      }
    })
  }

  addToCart() {
    this.cartService.addProduct(this.product);
    this.router.navigateByUrl(`/user/cart`)
  }

  slideLeft() {
    var slider = document.getElementById("recommendations")
    slider!.scrollLeft = slider!.scrollLeft - 500;
  }

  slideRight() {
    var slider = document.getElementById("recommendations")
    slider!.scrollLeft = slider!.scrollLeft + 500;
  }

  redirect(id: string) {
    this.router.navigateByUrl(`/user/productDetails/${id}`).then(()=>{
      this.id=this.route.snapshot.paramMap.get('id')!;
      this.loadData();
    })
  }
}