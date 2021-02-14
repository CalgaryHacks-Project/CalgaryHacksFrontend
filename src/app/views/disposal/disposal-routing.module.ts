import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisposalComponent } from '@app/views/disposal/disposal.component';

const routes: Routes = [
  {
    path: '',
    component: DisposalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisposalRoutingModule {}
