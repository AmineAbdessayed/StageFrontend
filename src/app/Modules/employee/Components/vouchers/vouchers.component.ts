import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent {


  vouchers:any;
  voucherId!:Number

  etat:any;
  constructor( private employeeService: EmployeeService , private router: Router ,     private route: ActivatedRoute
  ){}


ngOnInit(){
  this.getAllVouchers();
}


getAllVouchers(){

  this.employeeService.listVoucher().subscribe((data)=> {

    this.vouchers=data
    console.log(data)
  })
}

  DeleteVoucher(voucherId:number){

    this.employeeService.DeleteVoucher(voucherId).subscribe((response)=>{

      this.router.navigate([this.route.snapshot.url.join('/')]);

      console.log("Deleted",response)
    })


}

sendVoucherToAllClients(voucherId: number) {

  this.employeeService.sendVoucherToAllClients(voucherId).subscribe(response => {
    console.log('Response from backend:', response);

    if (response === "Bon non trouvé ou invalide.") {
      alert("Voucher is invalid.");
    } else{
      console.log("Voucher sent to all clients successfully.");
      alert("Voucher sent to all clients successfully.");
        }
    // Handle the response here
  }, error => {
    console.error('Error:', error);
    alert("An error occurred while sending the voucher.");

    // Handle the error here
  });
}


}



