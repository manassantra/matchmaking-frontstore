import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UseraccountService } from 'src/app/services/useraccount.service';

@Component({
  selector: 'app-uploadavtar',
  templateUrl: './uploadavtar.component.html',
  styleUrls: ['./uploadavtar.component.css']
})
export class UploadavtarComponent implements OnInit {

  imagerServer = "http://localhost/Images/"
  avtarUrl: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE26NjQaonqTRt7BXD_87Iuukitk_kcGBv3w&usqp=CAU';
  imageDetails: any = {};
  constructor(private usraccSrvc: UseraccountService) { }

  ngOnInit(): void {
    var user : User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    this.usraccSrvc.getPicture(user.authId).subscribe(res=>{
      this.imageDetails = res;
    //  console.log(this.imageDetails)
      this.avtarUrl = this.imagerServer + this.imageDetails.imageFilename
    })
  }

}
