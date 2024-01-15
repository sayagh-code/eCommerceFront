import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart! : Array<Product>;

  constructor() {
    this.cart = [];
   }

  public saveCart(cart: any){
    localStorage.setItem("Cart", JSON.stringify(cart));
  }

  public getCart(){
    if(JSON.parse(localStorage.getItem("Cart")!)==null){
      return this.cart;
    }else{
      this.cart = JSON.parse(localStorage.getItem("Cart")!);
      return this.cart;
    }
  }

  public addProduct(product: Product){
    let exist=false;
    if(product){
      if(this.cart.length!=0){
        this.cart.forEach((p)=>{
          if(p.id==product.id){
            p.quantity++;
            exist=true;
          }
        });
      }
      if(!exist){
        product.quantity=1;
        this.cart!.push(product);
      }
      this.saveCart(this.cart);
    }
  }
}
