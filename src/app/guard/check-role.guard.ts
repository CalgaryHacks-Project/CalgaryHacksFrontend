// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { UserService } from '@services/user.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CheckRoleGuard implements CanActivate {
//   constructor(private userService: UserService) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const { allowedRoles } = route.data;
//     const userRole = this.userService.getUserRole();
//     return allowedRoles.includes(userRole);
//   }
// }
