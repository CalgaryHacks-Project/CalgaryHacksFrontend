import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '@utils/components-parent.component';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { SidebarItem } from '@models/home';
import { HomeService } from '../home.service';

@Component({
  selector: 'stf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends ComponentParent implements OnInit {
  sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      link: '/',
      text: 'Dashboard',
      icon: 'dashboard'
    },
    {
      id: 'disposal',
      link: '/disposal',
      text: 'Disposal',
      icon: 'trash',
    },
    {
      id: 'rewards',
      link: '/rewards',
      text: 'rewards',
      icon: 'gift',
    },
    {
      id: 'Friends',
      link: '/friend',
      text: 'Friends',
      icon: 'people',
    },
    {
      id: 'setting',
      link: '/setting',
      text: 'Setting',
      icon: 'setting',
    },
  ];


  openSidebarItemId?: string;
  sidebarIsOpen: boolean;

  constructor(
    private homeService: HomeService,
    private router: Router,
    private userService: UserService,
  ) {
    super();
    this.sidebarIsOpen = this.windowOptions.lgOnly;
    this.setSidebarOptions();
  }

  ngOnInit() {
    super.ngOnInit();
    this.homeService.store.$sidebarOptions.pipe(takeUntil(this._$destroyed)).subscribe(data => {
      this.sidebarIsOpen = data.open;
    });
  }

  setSidebarOptions() {
    this.router.events.subscribe(event => {
      if (!this.windowOptions.lgOnly && event instanceof NavigationEnd) {
        this.toggleSidebar();
      }
    });
  }

  toggleSidebar() {
    this.homeService.toggleSidebar();
  }

  openDropdown(sidebarItem: SidebarItem) {
    if (sidebarItem.children) {
      if (this.openSidebarItemId) this.openSidebarItemId = undefined;
      else this.openSidebarItemId = sidebarItem.id;
    }
  }

  isDropdownOpen(sidebarItem: SidebarItem): boolean {
    return this.openSidebarItemId === sidebarItem.id;
  }

  logout() {
    this.userService.logout();
  }
}
