import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-create-shipping',
  templateUrl: './create-shipping.component.html',
  styleUrls: ['./create-shipping.component.scss']
})
export class CreateShippingComponent {

  
  ShippingForm:FormGroup;
  promotions:any
  commandeId!:number;

  
constructor( 
       private router:Router,
       private employeeService:EmployeeService,
       private formBuilder:FormBuilder,
       private activatedRoute:ActivatedRoute


){
  this.ShippingForm=this.formBuilder.group( {
    commandeId: ['', Validators.required ],
    trackingNumber: ['', Validators.required],
    shippingCompany: ['', Validators.required],
  }
  )
}
ngOnInit(){
     this.commandeId = +this.activatedRoute.snapshot.paramMap.get('id')!;


}


onSubmit() {
  if(this.ShippingForm.valid){
     
  
   
      const trackingNumber = this.ShippingForm.get('trackingNumber')?.value
      const shippingCompany = this.ShippingForm.get('shippingCompany')?.value
   
    

    this.employeeService.createShipping(this.commandeId,trackingNumber,shippingCompany).subscribe((response) => {
      console.log('Promotion created:', response);
      this.router.navigateByUrl("/employee/listShipping")
    } , 
  (error)=>{
console.error(error)
  }
  )

  }
}

}
