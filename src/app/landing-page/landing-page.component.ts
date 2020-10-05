import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service'

// Decoradores
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

// Clase principal del componente de la lógica de negocio
export class LandingPageComponent implements OnInit {

  constructor( private serviceService : ServiceService) { }

  ngOnInit(): void {
   
  }

}
