import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})

export class UseraccountService {
  
baseapiDEV = 'https://localhost:7002/api/useraccount/';
// baseapiPRD = '';


constructor(public http: HttpClient) { }

// Get User Profile
userDetails() {
    var user : User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    })
    return this.http.get(this.baseapiDEV + user.authId , {headers: header}).pipe(
      map((res) => {
       return res ;
      }),
      catchError(this.handleError)
    );
}

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

}
