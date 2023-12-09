import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    
  }

  public getAllProducts(): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/PRODUCT-SERVICE/products`);
  }

  public getPageProducts(page: number, size: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/PRODUCT-SERVICE/products`);
  }

  public deleteProduct(id : string): Observable<any>{
    return this.http.delete<any>(`http://localhost:8888/PRODUCT-SERVICE/products/${id}`);
  }

  public searchProducts(keyword: string, products: Product[]): Observable<Product[]>{
    let filteredProducts=products.filter(p=>p.name.includes(keyword));
    return of(filteredProducts);
  }
}
