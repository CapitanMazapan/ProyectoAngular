import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthServiceService } from './service/auth/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  private REST_API_SERVER = "http://web-luis.ddns.net/";
  constructor(private authGoogle: AngularFireAuth, private router: Router, private httpclient: HttpClient, private _authService: AuthServiceService) { }

  public getAuthGoogle() {
    this.authGoogle.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.authGoogle.authState.subscribe(user => {if(user != null){this.router.navigate(['/dashboard'])}});
  }

  public getProduct() {
    let user = this._authService.getUser()
    let token = user['token']
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    };
    return this.httpclient.get(`${this.REST_API_SERVER}api/v1/dashboard/`, httpOptions);
  }

  addProducto(nombre_com: string, edad: string, correo: string): Observable<any> {
    let user = this._authService.getUser()
    let token = user['token']
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    };
    return this.httpclient.post(`${this.REST_API_SERVER}api/v1/dashboard/`, { nombre_com, edad, correo }, httpOptions);
  }

  deleteProduct(id: string): Observable<any> {
    let user = this._authService.getUser()
    let token = user['token']
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    };
    return this.httpclient.delete(`${this.REST_API_SERVER}api/v1/dashboard/${id}`, httpOptions);
  }

  updateProducto(id: string, nombre_com: string, edad: string, correo: string): Observable<any> {
    let user = this._authService.getUser()
    let token = user['token']
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    };
    return this.httpclient.put(`${this.REST_API_SERVER}api/v1/dashboard/${id}`, { nombre_com, edad, correo }, httpOptions);
  }

  getSingleProducto(id: string) {
    let user = this._authService.getUser()
    let token = user['token']
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    };
    return this.httpclient.get(`${this.REST_API_SERVER}api/v1/dashboard/${id}`, httpOptions);
  }

}