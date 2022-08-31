import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UseraccountService } from 'src/app/services/useraccount.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName: any;
  userProfile: any = {}
  isLoggedin: boolean = false;

  constructor(private userSvc: UseraccountService, private authSrvc: AuthService, private toaster: ToastrService) { }

  ngOnInit(): void {
    var user : User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    // console.log(user.authId)
    if (user.token) {
      this.isLoggedin = true;
      this.userSvc.userDetails().subscribe(res=>{
        this.userProfile = res;
        this.userName = this.userProfile.firstName;
      }, err=> {
        alert("Error - " + `${{err}}`)
      })
    } else {
      this.isLoggedin = false;
    }
  }

  // Logout User
  logout() {
    this.authSrvc.logout();
    this.toaster.success("Logout Successfully 😊", "SUCCESS !")
    setTimeout(() => {
      window.location.replace('');
    }, 1500);
    }
  }
