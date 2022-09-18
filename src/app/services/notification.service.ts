import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseApi = "https://localhost:7002/api/Notifications/"
  constructor(private http: HttpClient) { }

  getNotifications(id:any) {
    return this.http.get(this.baseApi + id);
  }
}
