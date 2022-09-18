import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  baseAPI = 'https://localhost:7002/api/'

  getPostUserDetails(id:any) {
    var user : User = JSON.parse(localStorage.getItem('authDetails') || '{}');
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    })
    return this.http.get(this.baseAPI + 'UserAccount/' + id);
  }

  getPost(id:any) {
    return this.http.get(this.baseAPI + 'userfeed/getpost/' + id);
  }

  getPublicPost(id:any){
    return this.http.get(this.baseAPI + 'PublicFeed/getpost/' + id);
  }

  createPost(post: any, id: any){
    return this.http.post(this.baseAPI + 'UserFeed/post/' + id, post);
  }
}
