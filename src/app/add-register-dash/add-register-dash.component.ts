import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-register-dash',
  templateUrl: './add-register-dash.component.html',
  styleUrls: ['./add-register-dash.component.css']
})

export class AddRegisterDashComponent implements OnInit {
  addRegisterFormGroup: FormGroup;
  products = [];
  value = '';

  constructor(private _formBuilder: FormBuilder, private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.addRegisterFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  addRegister(): void {
    const data = this.addRegisterFormGroup.value;
    if (data.fullname && data.age && data.email) {
      this.serviceService.addProducto(data.fullname, data.age, data.email).subscribe(access => { }, error => {
        console.log("Datos inválidos")
      })
    }
  }

}