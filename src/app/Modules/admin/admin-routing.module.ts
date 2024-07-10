import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { GetUsersComponent } from './Components/get-users/get-users.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { AddUserComponent } from './Components/add-user/add-user.component';

const routes: Routes = [

  {path:"dashbord",component:DashbordComponent},
  {path:"getUsers",component:GetUsersComponent},
  {path:"getUser/:id",component:UserDetailsComponent},
  {path:"addUser",component:AddUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
