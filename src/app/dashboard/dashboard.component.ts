import { Component, OnInit } from '@angular/core';
import { UseraccountService } from 'src/app/services/useraccount.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  username: any;
  uid: any;
  AccountType: any = "Free Membership";
  emailVerification = "Not Verified";
  mobVerification = "Not Verified";
  
  constructor(private userSrvc: UseraccountService) { }

  ngOnInit(): void {
    this.userSrvc.userDetails().subscribe(res=>{
      this.userDetails = res;
      this.uid = this.userDetails.uid;
      this.username = this.userDetails.fullName;
      if (this.userDetails.isEmailVerified == true) {
        this.emailVerification = "Verified"
      }
      if (this.userDetails.mobVerification == true) {
        this.mobVerification = "Verified"
      }
    })
  }

  addAvtar(){
    
  }

}
