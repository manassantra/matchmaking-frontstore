import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ReplaySubject, throwError } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  auth: any = {};

  baseapiDEV = 'https://localhost:7002/api/useraccount/';
  // baseapiPRD = '';

  constructor(public http: HttpClient) { }

  // Login Service
  userLogin(model: any) {
    return this.http.post( this.baseapiDEV + 'login', model).pipe(
      map((res)=>{
        this.auth = res;
        if (this.auth){
          localStorage.setItem('authDetails', JSON.stringify(this.auth));
          this.currentUserSource.next(this.auth);
        }
      }), 
    catchError(this.handleError)
  )}


  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
 
  // Set Auth User
  setCurrentUser(auth: User) {
    this.currentUserSource.next(auth);
  }

  // Logout 
  logout(){
    localStorage.removeItem('authDetails');
    this.currentUserSource.next(null!);
  }

}
