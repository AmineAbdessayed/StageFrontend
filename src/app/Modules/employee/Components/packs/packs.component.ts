import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent {

  packs: any[] = [];

  constructor(private employeeService:EmployeeService, private router:Router){}

  ngOnInit():void{
   this.getPacks();
  }
  getPacks():void {
    this.employeeService.listPacks()
      .subscribe((data)=> {
              this.packs=data;
      },
       (error)=> {
        console.error("error fetching products: '", error)
       })
  }
 

}
