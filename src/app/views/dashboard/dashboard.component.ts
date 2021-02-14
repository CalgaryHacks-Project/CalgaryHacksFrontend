import { Component, OnInit } from '@angular/core';
import { ComponentParent } from '@utils/components-parent.component';

@Component({
  selector: 'stf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends ComponentParent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
