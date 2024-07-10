import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent {
  products: any[] = [];
  stocks: any[]=[];

  constructor(private employeeService:EmployeeService, private router:Router){}

  ngOnInit():void{
   this.getProducts();
   this.fetchStock()
  }
  getProducts():void {
    this.employeeService.getProducts()
      .subscribe((data)=> {
              this.products=data;
      },
       (error)=> {
        console.error("error fetching products: '", error)
       })
  }
  fetchStock(){
    this.employeeService.getStocks().subscribe((data)=> {
      this.stocks=data;
      console.log(data)
    })

}
}
