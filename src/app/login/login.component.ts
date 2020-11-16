import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../service/auth/auth-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  matcher = new MyErrorStateMatcher();
  hide = true;
  waiting = false;

  constructor(private _snackBar: MatSnackBar, private serviceService: ServiceService, private _formBuilder: FormBuilder, private _authServiceService: AuthServiceService, private _router: Router) {
    if (_authServiceService.isAuthenticated()) {
      _router.navigate(['dashboard'])
    }
  }

  loginG(){
    this.serviceService.getAuthGoogle();
  }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    })
  }

  login(): void {
    this.waiting = true;
    const data = this.loginFormGroup.value;
    if (data.username && data.password) {
      this._authServiceService.login(data.username, data.password).subscribe(access => {
        localStorage.setItem('user', JSON.stringify(access));
        this._router.navigate(['dashboard']);
      }, error => {
          this.openSnackBar("The username or password is incorrect", "Close");
          this.waiting = false;
          console.log("Datos inválidos")
      }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}