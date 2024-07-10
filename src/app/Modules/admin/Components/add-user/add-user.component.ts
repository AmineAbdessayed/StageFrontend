import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent {

  addUserForm!: FormGroup; 
  user:any;


  constructor(private adminService:AdminService, 
              private router:Router,
              private formBuilder: FormBuilder, // Inject FormBuilder

  ){}


  ngOnInit(): void {
    // Initialize form and define form controls with validators
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userRole: ['', [Validators.required]],
      job: [''],
      company: [''],
      country: [''],
      address: [''],
      phone: ['']
    });
  }



  onSubmit(): void {
    if (this.addUserForm.valid) {
      console.log('Form submitted:', this.addUserForm.value);
      // Call service method to add new user
      this.adminService.addUser(this.addUserForm.value).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.router.navigateByUrl("/admin/getUsers")        },
        (error) => {
          console.error('Error adding user:', error);
          // Handle error scenario (e.g., show error message)
        }
      );
    } else {
      console.error('Form invalid');
    }
  }
}
