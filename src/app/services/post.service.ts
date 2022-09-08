import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  baseAPI = 'https://localhost:7002/api/'

  getPost(id:any) {
    return this.http.get(this.baseAPI + 'userfeed/getpost/' + id);
  }

  createPost(post: any, id: any){
    return this.http.post(this.baseAPI + 'UserFeed/post/' + id, post);
  }
}
