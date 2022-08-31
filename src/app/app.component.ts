import { Component, OnInit } from '@angular/core';
import { User } from './model/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoggedin: boolean = false;
  
  // fakeCred = {
  //     "authId": 2,
  //     "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJtYW5hcy5uc2htZGdwQGdtYWlsLmNvbSIsIm5iZiI6MTY2MTgwMzI1NCwiZXhwIjoxNjYxODQ2NDU0LCJpYXQiOjE2NjE4MDMyNTR9.qn52-AjFwID1fMqboQllxlUiZxyVXg2vF84L9VQYsUrhXY6bhTSqfFN4iTYfWNle0JIuvN5NUKzc0VhPeNHMCA"
  // }

  constructor() {
    
  }

  ngOnInit(): void {
    // localStorage.setItem('authDetails', JSON.stringify(this.fakeCred));  
    var user : User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    if (user.token) {
      this.isLoggedin = true;
    } else {
      this.isLoggedin = false;
    }
  }
}
