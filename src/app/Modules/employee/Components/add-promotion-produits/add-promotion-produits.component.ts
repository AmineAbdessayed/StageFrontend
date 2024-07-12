import { Component } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promotion-produits',
  templateUrl: './add-promotion-produits.component.html',
  styleUrls: ['./add-promotion-produits.component.scss']
})
export class AddPromotionProduitsComponent {
  products: any[] = [];
  promotions: any[] = [];
  selectedProductId!: number;
  selectedPromotionId!: number;
  discountAmount!: number;
  tauxRemise!: number;

  constructor(private employeeService: EmployeeService , private router :Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadPromotions();
  }

  loadProducts(): void {
    this.employeeService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadPromotions(): void {
    this.employeeService.listPromotions().subscribe(promotions => {
      this.promotions = promotions;
    });
  }

  addProductToPromotion(): void {
    this.employeeService.addProductToPromotion(
      this.selectedPromotionId,
      this.selectedProductId,
      this.discountAmount,
      this.tauxRemise
    ).subscribe(response => {
      console.log('Product added to promotion', response);
      this.router.navigateByUrl("/employee/ProduitsPromotion")
    });
  }
}
