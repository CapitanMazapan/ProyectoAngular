import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth/auth-service.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  addRegisterFormGroup: FormGroup;
  status: Boolean = true;
  products = [];
  nameButton: String = 'Mostrar';

  constructor(private serviceService: ServiceService, private _formBuilder: FormBuilder, private _router: Router, private _authService: AuthServiceService) {
    if (_authService.isAuthenticated() == false) {
      _router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.addRegisterFormGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  onClickShow() {
    this.serviceService.getProduct().subscribe((data: any[]) => {
      this.products = data;
    })
  }
  onClickClear() {
    this.products = [];
  }
  showHide() {
    if (this.status) {
      this.nameButton = 'Mostrar';
    } else {
      this.nameButton = 'Ocultar';
    }
    this.status = !this.status;
  }


  logout(): void {
    localStorage.removeItem('user')
    this._router.navigate(['/'])
  }

  addRegister(): void {
    const data = this.addRegisterFormGroup.value;
    if (data.fullname && data.age && data.email) {
      this.serviceService.addProducto(data.fullname, data.age, data.email).subscribe(access => {
        this._router.navigate(['dashboard'])
        this.serviceService.getProduct().subscribe((data: any[]) => {
          this.products = data;
        })
      }, error => {
        console.log("Datos inválidos")
      })
    }
  }

  deleteProduct(id: string): void {
    this.serviceService.deleteProduct(id).subscribe(access => {
      this.serviceService.getProduct().subscribe((data: any[]) => {
        this.products = data;
      })
    }, error => {
      console.log("Datos inválidos")
    })

  }

}