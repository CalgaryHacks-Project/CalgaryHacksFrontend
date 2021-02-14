import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '@api/user-api.service';
import { UserInfo } from '@models/auth';
import { LocalStorageService } from '@utils/local-storage';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private LS = new LocalStorageService('token');

  constructor(
    private userApi: UserApiService,
    private router: Router,
    private cookie: CookieService,
  ) {}

  getUserInfo() {
    return this.userApi.getUserInfo().pipe(
      map(data => {
        this.handleGetUserInfo(data);
        return data;
      }),
    );
  }

  get userInfo(): UserInfo | undefined {
    return this.LS.get('userInfo');
  }

  private set _userInfo(curr: UserInfo | undefined) {
    this.LS.set('userInfo', curr);
    if (curr) {
      this._$userInfo.next(curr);
    }
  }

  private _$userInfo = new Subject<UserInfo>();
  get $userInfo(): Observable<UserInfo> {
    return this._$userInfo.pipe(distinctUntilChanged((old, curr) => old === curr));
  }

  handleGetUserInfo(userInfo: UserInfo | any) {
    this._userInfo = userInfo as UserInfo;
  }

  getFullName(): string | undefined {
    if (!this.userInfo) return undefined;
    return [this.userInfo.firstname, this.userInfo.lastname].join(' ');
  }

  getEnabled(): boolean | undefined {
    if (!this.userInfo) return undefined;
    return this.userInfo.enabled;
  }



  logout() {
    this._userInfo = undefined;
    this.cookie.delete('token', '/', '.pegah.tech');
    return this.router.navigate(['/login']).catch(() => {
      location.href = '/login';
    });
  }
}
