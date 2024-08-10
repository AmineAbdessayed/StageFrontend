import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.scss']
})

export class VoucherDetailsComponent {
  UserForm:FormGroup;
  voucherDetails:any
  voucherId!:number
  users:any


  constructor(private router:Router,
    private employeeService:EmployeeService, 
    private activatedRoute : ActivatedRoute,
    private formBuilder :FormBuilder){


this.UserForm= this.formBuilder.group({

  userId: ['',Validators.required],


})



}





ngOnInit(): void {
this.voucherId = +this.activatedRoute.snapshot.paramMap.get('id')!;
this.getOneVoucher();
this.fetchUsers()

}

applyVoucherToUser(voucherId: number) {
  const userId = this.UserForm.get('userId')?.value;

  let params = new HttpParams()
    .set('id', voucherId.toString())
    .set('userId', userId.toString());

  this.employeeService.applyVoucherToUser(params).subscribe(response => {
    console.log('Response from backend:', response);
    this.router.navigateByUrl("/employee/listVoucher"); // Navigate to the list of vouchers
  }, error => {
    console.error('Error:', error);
  });
}


fetchUsers(){
this.employeeService.getUsers().subscribe((data)=> {
this.users=data;
console.log(data)
})
}

getOneVoucher() {
  this.employeeService.getOneVoucher(this.voucherId).subscribe(
    (data) => {
      this.voucherDetails = data;
      console.log(data);
    },
    (error) => {
      console.error('Error fetching voucher details:', error);
      alert('An error occurred while fetching voucher details. Please try again later.');
    }
  );
}



}
