import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  api: String = 'https://backend-web-ids.herokuapp.com/';

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    let user = JSON.parse(localStorage.getItem('user')); //Pediente user
    if (user) {
      return user['token'] ? true : false //Pediente token
    } else {
      return false
    }
  }

  getUser(): Object {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(`${this.api}api/v1/login/`, { username, password }, httpOptions);
  }

  register(username: string, email: string, password1: string, password2: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(`${this.api}api/v1/login/rest-auth/registration/`, { username, email, password1, password2 }, httpOptions);
  }
}
