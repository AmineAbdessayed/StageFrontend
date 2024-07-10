import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-stocks-details',
  templateUrl: './stocks-details.component.html',
  styleUrls: ['./stocks-details.component.scss']
})
export class StocksDetailsComponent {
  stock:any;
  stockId!:number


  constructor(private router: Router, 
              private activatedRouted: ActivatedRoute,
              private employeeService:EmployeeService
  ){}

  ngOnInit(){
    this.stockId = +this.activatedRouted.snapshot.paramMap.get('id')!;
    this.getStock();
   
  }


  getStock(){
    this.employeeService.getOneStock(this.stockId).subscribe(
       (data)=>{
        this.stock=data
        console.log(data)
       }
    )
  }

}
