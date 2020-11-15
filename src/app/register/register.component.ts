import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthServiceService } from '../service/auth/auth-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  password1FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  password2FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  matcher = new MyErrorStateMatcher();
  hide = true;
  hide2 = true;

  constructor(private _formBuilder: FormBuilder, private _authServiceService: AuthServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group({
      username: this.usernameFormControl,
      email: this.emailFormControl,
      password1: this.password1FormControl,
      password2: this.password2FormControl,
    }, { validators: this.checkPasswords });
  }

  register(): void {
    const data = this.registerFormGroup.value;
    if (data.username && data.email && data.password1 && data.password2) {
      this._authServiceService.register(data.username, data.email, data.password1, data.password2).subscribe(access => {
        this._router.navigate(['login'])
      }, error => {
        console.log("Datos inválidos")
      }
      );
    }
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password1').value;
    let confirmPass = group.get('password2').value;
    return pass === confirmPass ? null : { notSame: true }     
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}