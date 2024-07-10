import { Component } from '@angular/core';
import { EmployeeModule } from '../../employee.module';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent { 


  stocks: any[]=[];
  constructor(private employeeService: EmployeeService,
              private router : Router
  ){}
  ngOnInit(){

    this.getStocks();
  }



  getStocks(): void{

    this.employeeService.getStocks().subscribe(
      (data)=> { this.stocks=data 
         console.log(data)
      }
    )
  }

}
