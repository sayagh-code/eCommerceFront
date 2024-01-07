import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart! : Array<Product>;

  constructor() { }

  public saveCart(cart: any){
    localStorage.setItem("Cart", JSON.stringify(cart));
  }

  public getCart(){
    this.cart = JSON.parse(localStorage.getItem("Cart")!);
    if(this.cart==null){
      return [];
    }else{
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
        let p=product;
        p.quantity=1;
        this.cart!.push(product);
      }
      this.saveCart(this.cart);
    }
  }
}
