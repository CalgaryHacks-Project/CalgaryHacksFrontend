import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { ComponentParent } from '@utils/components-parent.component';
import { HomeService } from './home.service';

@Component({
  selector: 'stf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends ComponentParent implements OnInit {
  isSidebarOpen = this.homeService.store.sidebarOptions.open;

  constructor(private userService: UserService, private homeService: HomeService) {
    super();
    this.getUserInfo();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getUserInfo() {
    // this.userService
    //   .getUserInfo()
    //   .pipe(this.reqPipe())
    //   .subscribe(() => {});
  }
}
