import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cart! : Array<Product>;

  constructor(private cartService: CartService){

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

}
