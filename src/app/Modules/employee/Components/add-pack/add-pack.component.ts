import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pack',
  templateUrl: './add-pack.component.html',
  styleUrls: ['./add-pack.component.scss']
})
export class AddPackComponent implements OnInit {



  
  PackForm: FormGroup;
  produits: any[] = [];
  selectedFile: File | null = null;


  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.PackForm = this.formBuilder.group({
      libelle: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      etat: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }


  fetchProducts() {
    this.employeeService.getProducts().subscribe((data) => {
      this.produits = data;
      console.log(data);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.PackForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('packs', new Blob([JSON.stringify(this.PackForm.value)], { type: 'application/json' }));
      formData.append('file', this.selectedFile);

      this.employeeService.addPack(formData).subscribe(
        (response) => {
          console.log('Pack created:', response);
          this.router.navigateByUrl("/employee/produits");
        },
        (error) => {
          console.error('Error creating pack:', error);
        }
      );
    } else {
      console.error('Form is invalid or file is not selected');
    }
  }

}
