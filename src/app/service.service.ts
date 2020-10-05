import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private authGoogle: AngularFireAuth, private router: Router) { }

  public getAuthGoogle() {
    this.authGoogle.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.authGoogle.authState.subscribe(user => {if(user != null){this.router.navigate(['/dashboard'])}});
  }
}