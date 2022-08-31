import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authDetails: any = {};
  constructor(private toaster: ToastrService){}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    var user: User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    this.authDetails = user;
    if(!this.authDetails.token) {
      this.toaster.warning("Please Login to Continue...", "Warning !");
      setTimeout(()=>{
        window.location.replace('');
      }, 2500);
      return false;
    } else 
    return true;
   // throw new Error('Method not implemented.');
  }
  
}
