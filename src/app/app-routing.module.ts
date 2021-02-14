import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
// import { AuthorizedGuard } from '@app/guard/authorized.guard';
// import { NotAuthorizedGuard } from '@app/guard/not-authorized.guard';

function urlMatcher(segments: UrlSegment[], regex: RegExp) {
  return segments.length >= 1 && regex.exec(segments[0].path);
}

export function authMatcher(segments: UrlSegment[]) {
  return urlMatcher(segments, /^(login|register)$/) ? { consumed: [] } : (undefined as any);
}

const routes: Routes = [
  // {
  //   matcher: authMatcher,
  //   loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),

  // },
  {
    path: '',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),

  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 60],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
