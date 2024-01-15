import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  public saveBill(product: Product[], customer: string): Observable<any>{
    const formData = new FormData();
    const productJson = JSON.stringify(product);

    formData.append('product', productJson);
    formData.append('customer', customer);
    
    return this.http.post<any>(`http://localhost:8888/BILL-SERVICE/addBill`, formData);
  }
}
