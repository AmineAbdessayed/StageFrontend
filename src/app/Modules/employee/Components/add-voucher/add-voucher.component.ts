import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.scss']
})
export class AddVoucherComponent {

  VoucherForm:FormGroup;
constructor( 
       private router:Router,
       private employeeService:EmployeeService,
       private formBuilder:FormBuilder


){
  this.VoucherForm=this.formBuilder.group( {
    reductionAmount: ['', Validators.required],
    percentageReduction : ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    etat: ['ON', Validators.required], 
  }
  )
}



onSubmit() {
  if(this.VoucherForm.valid){
     
    const voucherData= {

      reductionAmount : this.VoucherForm.get('reductionAmount')?.value,
      percentageReduction : this.VoucherForm.get('percentageReduction')?.value,
      startDate : this.VoucherForm.get('startDate')?.value,
      endDate : this.VoucherForm.get('endDate')?.value,
      etat : this.VoucherForm.get('etat')?.value,
    }

    this.employeeService.addVoucher(voucherData).subscribe((response) => {
      console.log('Voucher created:', response);
      this.router.navigateByUrl("/employee/listVoucher")
    } , 
  (error)=>{
console.error(error)
  }
  )

  }
}

}
