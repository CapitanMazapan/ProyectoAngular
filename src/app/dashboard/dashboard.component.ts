import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../service/auth/auth-service.service';
import { AddRegisterDashComponent } from '../add-register-dash/add-register-dash.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullname', 'age', 'email', 'update', 'delete'];
  dataSource;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private serviceService: ServiceService, private _router: Router, private _authService: AuthServiceService) {
    if (_authService.isAuthenticated() == false) {
      _router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.serviceService.getProduct().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddRegisterDashComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logout(): void {
    localStorage.removeItem('user')
    this._router.navigate(['/'])
  }

  deleteProduct(id: string): void {
    this.serviceService.deleteProduct(id).subscribe(access => {
      this.table.renderRows();
    }, error => {
      console.log("Datos inválidos")
    })
  }

}