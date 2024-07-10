import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signUpForm!:FormGroup
  constructor( private fb :FormBuilder, 
               private authService:AuthService,
               private snackBar: MatSnackBar,
               private router:Router
  ) {
    this.signUpForm=this.fb.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      

    }, )
  }

  passwordMatchValidator(form:FormGroup){

    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { 'mismatch': true };

  }



  onSubmit(){

    if(this.passwordMatchValidator!=null){
      this.snackBar.open("Password do not match","Close", {duration:5000, panelClass:"error-snackbar"})

    }

    this.authService.register(this.signUpForm.value).subscribe((res)=> {

    
      console.log(res);
      if(res.id!=null){
        this.snackBar.open("Signup Successful!","Close",{duration:5000});
        this.router.navigateByUrl("/login")

      }else {
        this.snackBar.open("Sign up failed", "close",{duration:4000, panelClass: "error-snackbar"})
      }
  })

 }
}
