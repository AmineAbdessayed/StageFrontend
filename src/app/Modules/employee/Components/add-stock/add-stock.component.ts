import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModule } from '../../employee.module';
import { EmployeeService } from '../../Services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent {

  stockForm:FormGroup;
  stock:any
constructor( 
       private router:Router,
       private employeeService:EmployeeService,
       private formBuilder:FormBuilder


){
  this.stockForm=this.formBuilder.group( {
    name: ['', Validators.required],
    ref: ['', Validators.required],
    location: ['', Validators.required],
    maxQuantity: ['', Validators.required],
  }
  )
}


onSubmit() {
  if(this.stockForm.valid){
     
    const stockData= {

      name : this.stockForm.get('name')?.value,
      ref : this.stockForm.get('ref')?.value,
      location : this.stockForm.get('location')?.value,
      maxQuantity : this.stockForm.get('maxQuantity')?.value,
    }

    this.employeeService.addStock(stockData).subscribe((response) => {
      console.log('Product created:', response);
      this.router.navigateByUrl("/employee/stocks")
    } , 
  (error)=>{
console.error(error)
  }
  )

  }
}





}
