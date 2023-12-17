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

  public getAllCustomers(): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/USER-SERVICE/visitors`);
  }

  public getPageCustomers(page: number, size: number): Observable<any>{
    return this.http.get<any>(`http://localhost:8888/USER-SERVICE/visitors`);
  }

  public deleteCustomer(id : string): Observable<any>{
    return this.http.delete<any>(`http://localhost:8888/USER-SERVICE/visitors/${id}`);
  }

  public searchCustomers(keyword: string, customers: Customer[]): Observable<Customer[]>{
    let filteredCustomers=customers.filter(p=>p.fullName.includes(keyword));
    return of(filteredCustomers);

  }
}
