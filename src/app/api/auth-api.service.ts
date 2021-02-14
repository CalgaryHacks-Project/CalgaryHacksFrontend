import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, RegisterPayload } from '@models/auth';
import { API_BASE_URL } from '@constants/urls.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginPayload) {
    return this.http.post(`${API_BASE_URL}/login`, loginForm);
  }

  register(registerForm: RegisterPayload) {
    return this.http.post(`${API_BASE_URL}/register`, registerForm);
  }
}
