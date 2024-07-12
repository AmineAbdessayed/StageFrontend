import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService, ProductPromotionDTO } from '../../Services/employee.service';

@Component({
  selector: 'app-produits-promotions',
  templateUrl: './produits-promotions.component.html',
  styleUrls: ['./produits-promotions.component.scss']
})
export class ProduitsPromotionsComponent {
 productsWithPromotions: ProductPromotionDTO[] = [];


  constructor( private router :Router , private employeService:EmployeeService){}

ngOnInit(){
  this.loadProductsWithPromotions();


}
loadProductsWithPromotions(): void {
  this.employeService.getProductsWithPromotions()
    .subscribe({
      next: (data) => {
        this.productsWithPromotions = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error fetching products with promotions', error);
      }
    });
}


}
