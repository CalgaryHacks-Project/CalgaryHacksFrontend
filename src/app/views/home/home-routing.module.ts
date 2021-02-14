import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('app/views/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('@app/views/setting/setting.module').then(m => m.SettingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
