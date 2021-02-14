// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthorizedGuard implements CanActivate {
//   constructor(private router: Router, private cookieService: CookieService) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (!this.cookieService.get('token')) {
//       return this.router.parseUrl('/login');
//     }
//     return true;
//   }
// }
