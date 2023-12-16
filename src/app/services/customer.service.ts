import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
    
  }

  public getAllProducts(): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/VISITOR-SERVICE/visitors`);
  }

  public getPageProducts(page: number, size: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/VISITOR-SERVICE/visitors`);
  }

  public deleteProduct(id : string): Observable<any>{
    return this.http.delete<any>(`http://localhost:8888/VISITOR-SERVICE/visitors/${id}`);
  }

  public searchProducts(keyword: string, products: Customer[]): Observable<Customer[]>{
    let filteredProducts=products.filter(c=>c.name.includes(keyword));
    return of(filteredProducts);
  }
}
