import { Directive, OnDestroy, OnInit } from '@angular/core';
import { AppInjector } from '@app/configs/app-injector';
import { LoaderDirective } from '@directives/loader/loader.directive';
import { PageOptions, WindowOptions } from '@models/page';
import { PageService } from '@services/page.service';
import { MonoTypeOperatorFunction, Observable, Subject, Subscription } from 'rxjs';
import { auditTime, finalize, takeUntil } from 'rxjs/operators';

@Directive()
export abstract class ComponentParent implements OnInit, OnDestroy {
  protected subscriptions = new Subscription();
  protected page = AppInjector.get<PageService>(PageService);
  windowOptions!: WindowOptions;
  pageOptions!: PageOptions;

  constructor() {
    this.windowOptions = this.page.windowOptions;
    this.pageOptions = this.page.pageOptions;
  }

  ngOnInit() {
    this.page.$windowOptions.pipe(takeUntil(this._$destroyed)).subscribe(item => {
      this.windowOptions = item;
    });
    this.page.$pageOptions.pipe(takeUntil(this._$destroyed)).subscribe(item => {
      this.pageOptions = item;
    });
  }

  protected _$destroyed = new Subject<any>();
  ngOnDestroy() {
    this._$destroyed.next();
    this.subscriptions.unsubscribe();
  }

  private currentActiveRequests = new Map<
    LoaderDirective,
    { active: boolean; loaderObs: Subject<boolean> }
  >();
  protected reqPipe<T>(
    loader?: LoaderDirective,
    { loaderAudit = true } = {},
  ): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => {
      this.activateLoader(loader, loaderAudit);
      return source.pipe(
        takeUntil(this._$destroyed),
        finalize(() => {
          return this.deactivateLoader(loader);
        }),
      );
    };
  }
  protected isLoaderActive(loader: LoaderDirective | undefined | boolean) {
    const searchInActiveRequests = (_loader: LoaderDirective): boolean => {
      const req = this.currentActiveRequests.get(_loader);
      return !!req && req.active;
    };
    return (
      loader != null &&
      (typeof loader === 'boolean'
        ? loader === true
        : /* loader.is === true */ searchInActiveRequests(loader))
    );
  }
  protected activateLoader = (loader: LoaderDirective | undefined, loaderAudit = true) => {
    if (!loader) return;

    const getNewLoaderController = () => {
      const loaderObs = new Subject<boolean>();
      loaderObs.pipe(auditTime(loaderAudit ? 200 : 0)).subscribe(value => {
        this.immidateSetLoader(loader, value);
      });
      const activeLoader = { active: true, loaderObs };
      this.currentActiveRequests.set(loader, activeLoader);
      return activeLoader;
    };

    const loaderController = this.currentActiveRequests.get(loader) || getNewLoaderController();
    loaderController.loaderObs.next(true);
  };

  protected deactivateLoader = (loader: LoaderDirective | undefined) => {
    if (!loader) return;

    const loaderController = this.currentActiveRequests.get(loader);
    if (!loaderController) {
      this.immidateSetLoader(loader, false);
      return;
    }

    loaderController.loaderObs.next(false);
    if (loader) this.currentActiveRequests.set(loader, { ...loaderController, active: false });
  };

  private immidateSetLoader(loader: LoaderDirective, value: boolean) {
    if (loader instanceof LoaderDirective) loader.is = value;
  }
}
