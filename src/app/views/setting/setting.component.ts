import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentParent } from '@utils/components-parent.component';

@Component({
  selector: 'stf-domain-access',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent extends ComponentParent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
