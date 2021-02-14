import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { ComponentParent } from '@utils/components-parent.component';
import { HomeService } from '../home.service';

@Component({
  selector: 'stf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends ComponentParent implements OnInit {
  fullName = this.userService.getFullName();
  isSidebarOpen = this.homeService.store.sidebarOptions.open;

  constructor(private userService: UserService, public homeService: HomeService) {
    super();
    this.userService.$userInfo.subscribe(() => {
      this.fullName = this.userService.getFullName();
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.userService.$userInfo.subscribe(() => {
      this.fullName = this.userService.getFullName();
    });

    this.homeService.store.$sidebarOptions.subscribe(data => {
      this.isSidebarOpen = data.open;
    });
  }

  logout() {
    this.userService.logout();
  }

  toggleSidebar() {
    this.homeService.toggleSidebar();
  }
}
