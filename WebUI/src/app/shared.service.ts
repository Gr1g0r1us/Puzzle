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

  createPuzzle(puzzleObj:any){
    return this.http.post<any>(`${this.APIUrl}createPuzzle`,puzzleObj)
  }

  deletePuzzle(puzzleObj:any){
    return this.http.post<any>(`${this.APIUrl}deletePuzzle`, puzzleObj)
  }

  getPuzzles(){
    return this.http.post<any>(`${this.APIUrl}getPuzzles`, null)
  }

  getLevels(){
    return this.http.post<any>(`${this.APIUrl}getLevels`, null)
  }

  setLevel(levelObj: any){
    return this.http.post<any>(`${this.APIUrl}setLevel`, levelObj)
  }

  saveArt(img:any){
    return this.http.post<any>(`${this.APIUrl}saveart`, img);
  }

  deleteArt(img:any){
    return this.http.post<any>(`${this.APIUrl}deleteart`, img)
  }

  getArts(){
    return this.http.post<any>(`${this.APIUrl}getarts`, null)
  }

  getPuzzleLevel(element:any){
    return this.http.post<any>(`${this.APIUrl}getpuzzleLevel`,element)
  }

  getPuzzleArt(element:any){
    return this.http.post<any>(`${this.APIUrl}getpuzzleArt`, element)
  }
}
