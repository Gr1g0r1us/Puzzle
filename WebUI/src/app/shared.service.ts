import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl: string="https://localhost:7271/api/User/";

  constructor(private http: HttpClient) { 

  }

  singup(userObj:any){
    return this.http.post<any>(`${this.APIUrl}register`,userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.APIUrl}authentificate`,loginObj);
  }

  checkLogin(userObj:any){
    return this.http.post<any>(`${this.APIUrl}checkLogin`,userObj);
  }
}
