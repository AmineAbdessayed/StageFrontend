import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




const BaseUrl="http://localhost:8082/api";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  register(registerRequest:any): Observable<any>{
    return this.http.post(BaseUrl + "/auth/signup", registerRequest);
  }

  login(loginRequest:any):Observable<any>{
    return this.http.post(BaseUrl + "/auth/login", loginRequest)
  }
}
