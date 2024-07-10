import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { ProduitsComponent } from './Components/produits/produits.component';
import { AddProduitComponent } from './Components/add-produit/add-produit.component';
import { ProduitsDetailsComponent } from './Components/produits-details/produits-details.component';

const routes: Routes = [

  {path:"dashbord",component:DashbordComponent},
  {path:"produits",component:ProduitsComponent},
  {path:"addProduit",component:AddProduitComponent},
  {path:"produitsDetails/:id",component:ProduitsDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
