import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.scss']
})
export class AddPromotionsComponent {


  PromotionForm:FormGroup;
  promotions:any
constructor( 
       private router:Router,
       private employeeService:EmployeeService,
       private formBuilder:FormBuilder


){
  this.PromotionForm=this.formBuilder.group( {
    name: ['', Validators.required],
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    etat: ['ON', Validators.required], 
  }
  )
}



onSubmit() {
  if(this.PromotionForm.valid){
     
    const promotionData= {

      name : this.PromotionForm.get('name')?.value,
      dateDebut : this.PromotionForm.get('dateDebut')?.value,
      dateFin : this.PromotionForm.get('dateFin')?.value,
      etat : this.PromotionForm.get('etat')?.value,
    }

    this.employeeService.addPromotion(promotionData).subscribe((response) => {
      console.log('Promotion created:', response);
      this.router.navigateByUrl("/employee/promotions")
    } , 
  (error)=>{
console.error(error)
  }
  )

  }
}
}
