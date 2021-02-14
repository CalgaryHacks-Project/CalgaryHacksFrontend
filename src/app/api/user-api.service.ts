import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '@constants/urls.constant';
import { UserInfo } from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http.get(`${API_BASE_URL}/info`);
  }

  getUsers() {
    return this.http.get(`${API_BASE_URL}/users`);
  }

  editUser(form: UserInfo) {
    return this.http.post(`${API_BASE_URL}/user/edit`, form);
  }

}
