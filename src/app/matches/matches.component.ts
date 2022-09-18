import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FollowersService } from '../services/followers.service';
import { NotificationService } from '../services/notification.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  followings: any = [];
  followers: any = [];
  notifications : any;
  notificationList: any = [];
  post: any = [];
  postCount: any;

  constructor(private folloerSrvc: FollowersService, 
              private postSrvc: PostService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    var user : User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    this.postSrvc.getPost(user.authId).subscribe(res=>{
      this.post = res;
      this.postCount = this.post.length;
    })
    this.folloerSrvc.getFollowings(user.authId).subscribe(res=>{
      this.followings = res;
    });
    this.folloerSrvc.getFollowers(user.authId).subscribe(res=>{
      this.followers = res;
    })
    this.notification.getNotifications(user.authId).subscribe(res=>{
      this.notificationList = res ;
      this.notifications = this.notificationList.length;
    })
  }

}
