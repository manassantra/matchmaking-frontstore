import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  model: any = {}
  constructor(private authSrvc: AuthService, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    // console.log(this.model)
    this.authSrvc.userLogin(this.model).subscribe(res=>{
      this.toaster.success("Login Successful 😊", "SUCCESS !")
      setTimeout(() => {
        window.location.replace('dashboard');
      }, 1500);
    })
  }
}
