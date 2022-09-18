import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FollowersService {

  baseApi = 'https://localhost:7002/api/'

  constructor(public http: HttpClient) { }

  getFollowings(id:any) {
    return this.http.get(this.baseApi + 'Followers/following/' + id);
  }

  getFollowers(id: any){
    return this.http.get(this.baseApi + 'Followers/followers/' + id);
  }
}
