import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth/auth-service.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router, private _authService: AuthServiceService) {
    if (_authService.isAuthenticated() == false) {
      _router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }

}