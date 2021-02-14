import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationsOptions, PageOptions, WindowOptions } from '@models/page';
import { ObservedBy, Observing } from '@utils/observed-property-decorator';
import { NotificationsService } from 'angular2-notifications';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private bodyElm: HTMLBodyElement = document.querySelector('body')!;
  private siteName = '';

  readonly mediaQueries = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  };

  @Observing('pageOptions') $pageOptions = new Subject<WindowOptions>();
  @ObservedBy('$pageOptions') pageOptions: PageOptions = {};

  @Observing('windowOptions') $windowOptions: Observable<WindowOptions> = new Subject<
    WindowOptions
  >();
  @ObservedBy('$windowOptions') windowOptions!: WindowOptions; // Initialized in constructor
  matPrimaryColor?: string;

  constructor(private notificationService: NotificationsService, private titleService: Title) {
    this.configureWindowOptions();
    this.getMaterialColor();
  }

  private configureWindowOptions() {
    this.checkWindowOptions();
    window.addEventListener('resize', _event => this.checkWindowOptions());
    document.addEventListener('load', _event => this.checkWindowOptions());
  }

  /**
   * Page Title
   * @param newTitle Title to be set
   */
  private lastPageTitle = '';
  setTitle(newTitle: string = this.lastPageTitle) {
    this.lastPageTitle = newTitle;
    this.titleService.setTitle(`${newTitle} - ${this.siteName}`);
  }

  /**
   * Notify
   */

  notify(
    type: 'warn' | 'alert' | 'error' | 'info' | 'success',
    title: string,
    content = '',
    options?: NotificationsOptions,
  ) {
    return this.notificationService.create(
      title,
      content,
      type as any,
      this.getNotificationOptions(options),
    );
  }

  error(title: string, content = '', options?: NotificationsOptions) {
    return this.notificationService.error(title, content, this.getNotificationOptions(options));
  }

  success(title: string, content = '', options?: NotificationsOptions) {
    return this.notificationService.success(title, content, this.getNotificationOptions(options));
  }

  private getNotificationOptions(options?: NotificationsOptions): any {
    if (options && options.clickable)
      return {
        timeOut: 4000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      };

    return undefined;
  }

  /**
   * Window Options
   */

  private checkWindowOptions() {
    const windowWidth = window.innerWidth;
    this.windowOptions = {
      ...this.windowOptions,
      windowWidth,
      xl: windowWidth >= this.mediaQueries.xl,
      lg: windowWidth >= this.mediaQueries.lg,
      md: windowWidth >= this.mediaQueries.md,
      sm: windowWidth >= this.mediaQueries.sm,
    };
    this.windowOptions = {
      ...this.windowOptions,
      lgOnly: this.windowOptions.lg || this.windowOptions.xl,
      mdOnly: this.windowOptions.md && !this.windowOptions.lg,
      smOnly: this.windowOptions.sm && !this.windowOptions.md,
    };

    ['xl', 'lg', 'md', 'sm'].forEach(_class => {
      if (this.windowOptions[_class]) this.bodyElm.classList.add(_class);
      else this.bodyElm.classList.remove(_class);
    });
    this.checkWindowWidth();
  }
  private checkWindowWidth() {
    if (this.windowOptions.windowWidth < this.mediaQueries.md) {
      this.bodyElm.classList.add('tablet');
    } else {
      this.bodyElm.classList.remove('tablet');
    }
  }

  private getMaterialColor() {
    const div = document.createElement('div');
    div.classList.add('mat-primary', 'mat-button', 'd-none');
    document.body.appendChild(div);
    setTimeout(() => {
      const primaryColor = window.getComputedStyle(div).color;
      this.matPrimaryColor = primaryColor || undefined;
      div.remove();
    });
  }
}
