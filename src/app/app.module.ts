import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ErrorHandler } from '@angular/core';
import { HttpErrorInterceptor } from '@app/interceptors/error.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CookieService } from 'ngx-cookie-service';
import { setAppInjector } from '@configs/app-injector';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
