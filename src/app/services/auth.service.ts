import { Injectable } from '@angular/core';
import { AuthApiService } from '@api/auth-api.service';
import { LoginPayload, RegisterPayload } from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authApi: AuthApiService) {}

  register(registerForm: RegisterPayload) {
    return this.authApi.register(registerForm);
  }

  login(loginForm: { userName: LoginPayload['userName']; password: LoginPayload['password'] }) {
    return this.authApi.login({ ...loginForm, model: 'Web', version: '1.0.0' });
  }
}
