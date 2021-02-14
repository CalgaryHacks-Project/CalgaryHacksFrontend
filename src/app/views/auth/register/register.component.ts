import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMustMatch } from '@utils/check-validation';
import { AuthService } from '@services/auth.service';
import { ComponentParent } from '@utils/components-parent.component';
import { LoaderDirective } from '@directives/loader/loader.directive';
import { TEAMS } from '@constants/user.constant';

@Component({
  selector: 'stf-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends ComponentParent implements OnInit {
  @ViewChild('registerLoader') registerLoader?: LoaderDirective;
  teams = TEAMS;

  registerForm = this.formBuilder.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern(/^[\w.]{2,16}$/gi)]],
      team: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: passwordMustMatch('password', 'confirmPassword'),
    },
  );

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: AuthService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  get data() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.auth
      .register(this.registerForm.value)
      .pipe(this.reqPipe(this.registerLoader))
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
