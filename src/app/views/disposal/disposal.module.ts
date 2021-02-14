import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisposalComponent } from './disposal.component';
import { DisposalRoutingModule } from '@app/views/disposal/disposal-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    DisposalRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [DisposalComponent]
})
export class DisposalModule { }
