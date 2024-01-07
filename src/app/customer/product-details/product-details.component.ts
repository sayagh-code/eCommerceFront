import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product! : Product;
  id! : string;
  category! : Category;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')!;
    this.loadData();
    this.cartService.getCart();
  }

  loadData(){
    this.productService.getProductById(this.id).subscribe({
      next: (prod)=>{
        this.product=prod;
        this.category=prod._embedded.category;
      }
    })
  }

  addToCart(p: Product) {
    this.cartService.addProduct(p);
    this.router.navigateByUrl(`/user/cart`)
  }
}