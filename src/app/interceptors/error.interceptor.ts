import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageService } from '@services/page.service';
import { UserService } from '@services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public notify: PageService,
    private cookie: CookieService,
    private user: UserService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
            this.notify.success(evt.body.success.title, evt.body.success.message);
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            if (err.status === 401) {
              this.notify.error('', 'Username or password is incorrect');
              this.cookie.deleteAll();
              this.user.logout();
            } else if (err.status === 403) {
              this.notify.error('Credential failed', '');
            } else if (err.status === 409) {
              this.notify.error('', 'Email or username existed');
            } else if (err.status === 417) {
              this.notify.error(
                '',
                'Password must contain lowercase, uppercase, letters and special characters',
              );
            } else {
              this.notify.error(err.status.toString(), err.message);
            }
          } catch {
            this.notify.error('An error occurred', '');
          }
        }
        return throwError(err);
      }),
    );
  }
}
