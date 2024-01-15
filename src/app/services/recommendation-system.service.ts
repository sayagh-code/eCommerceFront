import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationSystemService {

  constructor(private http : HttpClient) { }

  public recommendProducts(productName: string): Observable<any>{
    return this.http.post<any>(`http://localhost:8888/PRODUCT-SERVICE/getRecommendations`, productName);
  }

  public recommendProductsByUser(): Observable<any>{
    let user=JSON.parse(localStorage.getItem("authUser")!)
    let id = user.id;
    return this.http.get<any>(`http://localhost:8888/BILL-SERVICE/getRecommendations/${id}`);
  }
}
