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
  products = [];
  status: Boolean = false;
  nameButton: String = 'Mostrar';
  info: String = 'No hay datos'; 

  constructor( private serviceService : ServiceService) { }

  ngOnInit(): void {
    this.serviceService.getProduct("products/").subscribe((data : any[]) => {
      console.log(data);
      this.products = data;
    });    
  }
  
  sendService() {}

  cleanService() {
    this.products = [];
  }

  showHide() {
    this.status = !this.status // Toggle
    console.log(this.status);
    
    if (this.status) {
      this.nameButton = 'Ocultar';
    } else {
      this.nameButton = 'Mostrar';
    }
  }

}
