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
  produits:any;


  constructor(private router: Router, 
              private activatedRouted: ActivatedRoute,
              private employeeService:EmployeeService
  ){}

  ngOnInit(){
    this.stockId = +this.activatedRouted.snapshot.paramMap.get('id')!;
    this.getStock();
    this.getProduitsByStock(this.stockId)
   
  }


  getStock(){
    this.employeeService.getOneStock(this.stockId).subscribe(
       (data)=>{
        this.stock=data
        console.log(data)
       }
    )
  }

  DeleteStock(stockId:number){
    this.employeeService.DeleteStock(stockId).subscribe((response)=>{console.log(response)})


  }
  
  getProduitsByStock(stockId:number){

    this.employeeService.getproduitByStockId(stockId).subscribe((data)=> {
        this.produits=data
                console.log(data)
    }  )


  }
}
