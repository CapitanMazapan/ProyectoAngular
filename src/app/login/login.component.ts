import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private serviceService : ServiceService) { }

  loginG(){
    this.serviceService.getAuthGoogle();
  } 

}
