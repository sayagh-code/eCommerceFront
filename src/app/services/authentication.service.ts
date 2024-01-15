import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  users : Customer[]=[];
  authenticatedUser : Customer | undefined;
  cart! : Array<Product>;

  constructor(private http: HttpClient) {
  }

  public login(username :string): Observable<Customer>{
    try{
      return this.http.get<any>(`http://localhost:8888/USER-SERVICE/visitors/search/findVisitorByUsername?name=${username}`);
    }catch(e){
      return throwError(()=>e);
    }
  }

  public signup(customer: Customer){
    return this.http.post<any>(`http://localhost:8888/USER-SERVICE/visitors`, customer);
  }

  public authenticateUser(appUser : Customer): Observable<boolean>{
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({id: appUser.id ,username: appUser.username, roles: appUser.role, jwt:"JWT_TOKEN"}));
    return of(true);
  }

  public hasRole(role :string): boolean {
    return this.authenticatedUser!.role == role;
  }

  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }

  public logout() :Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }

}