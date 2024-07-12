import { Component } from '@angular/core';
import { EmployeeModule } from '../../employee.module';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {

  promotion:any;
  promotionId!:Number

  constructor( private employeeService: EmployeeService , private router: Router ,     private route: ActivatedRoute
  ){}


ngOnInit(){
  this.getAllPromotions();
}


getAllPromotions(){

  this.employeeService.listPromotions().subscribe((data)=> {

    this.promotion=data
    console.log(data)
  })
}

  DeletePromotion(promotionId:number){

    this.employeeService.DeletePromotion(promotionId).subscribe((response)=>{

      this.router.navigate([this.route.snapshot.url.join('/')]);

      console.log("Deleted",response)
    })


}



}
