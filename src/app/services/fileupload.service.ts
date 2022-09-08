import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FileuploadService {

  baseAPI = 'https://localhost:7002/api/'

  constructor(private http: HttpClient) { }

  fileUploader(files:any, id: any) {
    return  this.http.post(this.baseAPI + 'gallery/upload/' + `${id}` , files);
  }
}
