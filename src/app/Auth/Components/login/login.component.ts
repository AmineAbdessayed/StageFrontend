import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service';
import { StorageService } from '../../Services/Storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  LoginForm:FormGroup
  constructor( private fb :FormBuilder, 
               private router:Router,
               private snackBar: MatSnackBar,
               private authService:AuthService,
    ) {
    this.LoginForm=this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      

    }, {})
  }


  onSubmit(){

   

    this.authService.login(this.LoginForm.value).subscribe((res)=> {

    
      console.log(res);
      if(res.userId!=null){
        const user= {
          id:res.userId,
          role:res.userRole

        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        console.log(StorageService.saveToken(res.jwt))
        console.log(StorageService.saveUser(user));
      
           
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('/admin/dashbord');
        } else if(StorageService.isEMPLOYEELoggedIn()){
          this.router.navigateByUrl('/employee/dashbord')
        }
        this.snackBar.open("Login Successful!","Close",{duration:5000});

      }else {
        this.snackBar.open("Login failed", "close",{duration:4000, panelClass: "error-snackbar"})
      }
  })

 }

}
