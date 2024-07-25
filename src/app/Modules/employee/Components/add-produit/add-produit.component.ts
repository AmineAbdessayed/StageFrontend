import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {

  productForm: FormGroup;
  stocks: any[] = [];
  selectedFile: File | null = null;
  colors: string[] = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'BLACK', 'WHITE'];


  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.productForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      prixHt: ['', Validators.required],
      prixHc: ['', Validators.required],
      tauxTva: ['', Validators.required],
      color: ['', Validators.required],
      stockId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchStock();
  }

  fetchStock() {
    this.employeeService.getStocks().subscribe((data) => {
      this.stocks = data;
      console.log(data);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('produits', new Blob([JSON.stringify(this.productForm.value)], { type: 'application/json' }));
      formData.append('stockId', this.productForm.get('stockId')?.value);
      formData.append('file', this.selectedFile);

      this.employeeService.addProduits(formData).subscribe(
        (response) => {
          console.log('Product created:', response);
          this.router.navigateByUrl("/employee/produits");
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    } else {
      console.error('Form is invalid or file is not selected');
    }
  }
}
