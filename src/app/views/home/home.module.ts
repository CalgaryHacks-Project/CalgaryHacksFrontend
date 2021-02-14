import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
