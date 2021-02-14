import { Injectable } from '@angular/core';
import { SidebarOptions } from '@models/page';
import { ObservedBy, Observing } from '@utils/observed-property-decorator';
import { Observable, Subject } from 'rxjs';
import { PageService } from '@services/page.service';

@Injectable({
  providedIn: 'root',
})
export class HomeStoreService {
  @ObservedBy('$sidebarOptions') sidebarOptions: SidebarOptions = {
    open: this.page.windowOptions.lgOnly,
  };
  @Observing('sidebarOptions') $sidebarOptions: Observable<SidebarOptions> = new Subject<
    SidebarOptions
  >();

  constructor(private page: PageService) {}

  setSidebarOptions(value: Partial<SidebarOptions>) {
    this.sidebarOptions = { ...this.sidebarOptions, ...value };
  }
}
