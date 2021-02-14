import { Component } from '@angular/core';
import { Options } from 'angular2-notifications';

@Component({
  selector: 'stf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  simpleNotifOptions: Options = {
    timeOut: 3000,
    pauseOnHover: true,
    preventDuplicates: true,
    showProgressBar: true,
    maxStack: 3,
  };

  title = 'staff-panel';
}
