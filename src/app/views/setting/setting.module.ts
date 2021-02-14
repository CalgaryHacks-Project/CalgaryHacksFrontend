import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from '@app/views/setting/setting.component';
import { SettingRoutingModule } from '@app/views/setting/setting-routing.module';


@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
  ],
})
export class SettingModule {}
