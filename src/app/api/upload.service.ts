import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '@constants/urls.constant';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadPhoto(photo){
    console.log('sending file');
    return this.http.post(`http://127.0.0.1:5000/`, photo);
  }
}
