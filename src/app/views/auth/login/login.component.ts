import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LoaderDirective } from '@directives/loader/loader.directive';
import { ComponentParent } from '@utils/components-parent.component';

@Component({
  selector: 'stf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ComponentParent implements OnInit {
  @ViewChild('loginLoader') loginLoader?: LoaderDirective;
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  redirectUrl: string | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService) {
    super();
    if (this.router.url.includes('redirect')) {
      this.redirectUrl = this.router.parseUrl(this.router.url).queryParams['redirect'];
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  get data() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.auth
      .login(this.loginForm.value)
      .pipe(this.reqPipe(this.loginLoader))
      .subscribe(() => {
        if (this.redirectUrl) {
          window.location.href = this.redirectUrl;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
