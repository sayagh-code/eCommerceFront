import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  users : Customer[]=[];
  authenticatedUser : Customer | undefined;
  constructor(private http: HttpClient) {
  }
  public login(username :string):Observable<Customer>{
    try{
      return this.http.get<any>(`http://localhost:8888/USER-SERVICE/visitors/search/findVisitorByUsername?name=${username}`);
    }catch(e){
      return throwError(()=>e);
    }
  }

  public authenticateUser(appUser : Customer):Observable<boolean>{
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({username:appUser.username, roles:appUser.role, jwt:"JWT_TOKEN"}));
    return of(true);
  }

  public hasRole(role :string) :boolean {
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