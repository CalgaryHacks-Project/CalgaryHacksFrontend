import { Injectable } from '@angular/core';
import { HomeStoreService } from '@app/store/home-store.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(public store: HomeStoreService) {}

  toggleSidebar() {
    this.store.setSidebarOptions({ open: !this.store.sidebarOptions.open });
  }
}
