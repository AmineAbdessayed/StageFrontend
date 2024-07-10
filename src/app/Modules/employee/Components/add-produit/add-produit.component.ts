import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit{

  productForm: FormGroup;
  stocks: any[]=[]


  constructor(private formBuilder: FormBuilder, private employeeService:EmployeeService , private router : Router)  {
    this.productForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      prixHt: ['', Validators.required],
      prixHc: ['', Validators.required],
      tauxTva: ['', Validators.required],
      stockId: ['', Validators.required] 
    });
  }

  ngOnInit(){
   this.fetchStock()
  }
  fetchStock(){
    this.employeeService.getStocks().subscribe((data)=> {
      this.stocks=data;
      console.log(data)
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = {
        libelle: this.productForm.get('libelle')?.value,
        description: this.productForm.get('description')?.value,
        prixHt: this.productForm.get('prixHt')?.value,
        prixHc: this.productForm.get('prixHc')?.value,
        tauxTva: this.productForm.get('tauxTva')?.value
      };
      const stockIdControl = this.productForm.get('stockId');
      if (stockIdControl?.value) {
        const stockId = stockIdControl.value;
        this.employeeService.addProduits(productData, stockId).subscribe(
          (response) => {
            console.log('Product created:', response);
            this.router.navigateByUrl("/employee/produits")
            // Reset the form or navigate to a different page
          },
          (error) => {
            console.error('Error creating product:', error);
          }
        );
      } else {
        console.error('Stock ID is required');
      }
    }
  }
  
  
  }