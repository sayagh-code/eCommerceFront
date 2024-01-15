import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cart! : Array<Product>;
  user : any;

  constructor(private cartService: CartService, private order: OrderService, private router: Router){
    this.cart=[]
  }

  ngOnInit(): void {
    this.cart=this.cartService.getCart();
  }

  Total(){
    let total=0;
    this.cart.forEach((p)=>{
      total+=(p.price*p.quantity);
    })
    return total
  }

  billing(){
    if(this.cart.length!=0){  
      this.user=JSON.parse(localStorage.getItem("authUser")!)
      this.order.saveBill(this.cart, this.user.id).subscribe({
        next: ()=>{
          localStorage.removeItem("Cart");
          this.cart=[];
          this.router.navigateByUrl(`/user/home`);
        }
      })
    }
  }
}
