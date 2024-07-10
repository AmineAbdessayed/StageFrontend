import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/Components/login/login.component';
import { RegisterComponent } from './Auth/Components/register/register.component';
import { authGuard } from './auth.guard';

const routes: Routes = [

  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"admin", loadChildren: ()=> import("./Modules/admin/admin.module").then(e=>e.AdminModule,),  canActivate: [authGuard]},
  {path:"employee", loadChildren: ()=> import("./Modules/employee/employee.module").then(e=>e.EmployeeModule),canActivate: [authGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
