import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../service/auth/auth-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  matcher2 = new MyErrorStateMatcher2();
  hide = true;
  hide2 = true;

  constructor(private _snackBar: MatSnackBar, private _formBuilder: FormBuilder, private _authServiceService: AuthServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, { validators: this.checkPasswords });
  }

  register(): void {
    const data = this.registerFormGroup.value;
    if (data.username && data.email && data.password1 && data.password2) {
      this._authServiceService.register(data.username, data.email, data.password1, data.password2).subscribe(access => {
        this.openSnackBar("Signed up successfully.", "Close");
        this._router.navigate(['login'])
      }, error => {
          this.openSnackBar("There's already an account with this username or email.", "Close");
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

export class MyErrorStateMatcher2 implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}