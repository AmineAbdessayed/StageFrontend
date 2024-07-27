// packs-details.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-packs-details',
  templateUrl: './packs-details.component.html',
  styleUrls: ['./packs-details.component.scss']
})
export class PacksDetailsComponent implements OnInit {
  packId!: number;
  packDetail: any;
  affectProductForm: FormGroup;
  discountForm: FormGroup;
  products: any[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.affectProductForm = this.formBuilder.group({
      productId: ['', Validators.required]
    });

    this.discountForm = this.formBuilder.group({
      discountValue: ['', Validators.required],
      prixCondition: ['DISCOUNT', Validators.required]
    });
  }

  ngOnInit(): void {
    this.packId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getOnePack();
    this.fetchProducts();
  }

  fetchProducts() {
    this.employeeService.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  getOnePack() {
    this.employeeService.GetOnePack(this.packId).subscribe((data) => {
      this.packDetail = data;
      console.log(this.packDetail);
    });
  }

  DeletePack(packId: number): void {
    this.employeeService.DeletePack(packId).subscribe(
      (response) => {
        console.log('Deleted successfully', response);
        this.router.navigateByUrl('/packs');
      },
      (error) => console.error('Error', error)
    );
  }

  AffectProduct() {
    if (this.affectProductForm.valid) {
      const productId = this.affectProductForm.get('productId')?.value;
      this.employeeService.AffectProductToPack(this.packId, productId).subscribe(
        (response) => {
          console.log('Affected successfully', response);
          this.getOnePack(); // Refresh pack details after affecting product
        },
        (error) => {
          console.error('Error affecting', error);
        }
      );
    }
  }

  applyDiscount() {
    if (this.discountForm.valid) {
      const discountValue = this.discountForm.get('discountValue')?.value;
      const prixCondition = this.discountForm.get('prixCondition')?.value;
      console.log(this.packId, "-----------------------");
      console.log(discountValue, "-----------------------");
      console.log(prixCondition, "-----------------------");
      this.employeeService.applyDiscountToPack(this.packId, discountValue, prixCondition).subscribe(
        (response) => {
          console.log('Discount applied successfully', response);
          this.getOnePack(); // Refresh pack details after applying discount
        },
        (error) => {
          console.error('Error applying discount', error);
        }
      );
    }
  }
}
