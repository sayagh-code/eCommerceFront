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

  public getProductById(id : string): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/PRODUCT-SERVICE/products/${id}`);
  }

  public getProductsByCategory(category: string): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/PRODUCT-SERVICE/products/search/findByCategory_NameCat?nameCat=${category}`);
  }

  public deleteProduct(id : string): Observable<any>{
    return this.http.delete<any>(`http://localhost:8888/PRODUCT-SERVICE/products/${id}`);
  }

  public addProduct(product: Product){
    return this.http.post<any>(`http://localhost:8888/PRODUCT-SERVICE/restProducts`, product);
  }

  public searchProducts(keyword: string, products: Product[]): Observable<Product[]>{
    let filteredProducts=products.filter(p=>p.name.includes(keyword));
    return of(filteredProducts);
  }
}