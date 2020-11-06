import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _router: Router) {

  }

  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  register(): void {
    const data = this.registerFormGroup.value;
  }

}
