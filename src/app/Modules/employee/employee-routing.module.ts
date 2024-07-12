import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { ProduitsComponent } from './Components/produits/produits.component';
import { AddProduitComponent } from './Components/add-produit/add-produit.component';
import { ProduitsDetailsComponent } from './Components/produits-details/produits-details.component';
import { StocksComponent } from './Components/stocks/stocks.component';
import { StocksDetailsComponent } from './Components/stocks-details/stocks-details.component';
import { AddStockComponent } from './Components/add-stock/add-stock.component';
import { PromotionsComponent } from './Components/promotions/promotions.component';
import { AddPromotionsComponent } from './Components/add-promotions/add-promotions.component';
import { ProduitsPromotionsComponent } from './Components/produits-promotions/produits-promotions.component';
import { AddPromotionProduitsComponent } from './Components/add-promotion-produits/add-promotion-produits.component';

const routes: Routes = [

  {path:"dashbord",component:DashbordComponent},



  {path:"produits",component:ProduitsComponent},
  {path:"addProduit",component:AddProduitComponent},
  {path:"produitsDetails/:id",component:ProduitsDetailsComponent},




  {path:"stockDetails/:id",component:StocksDetailsComponent},
  {path:"addStock",component:AddStockComponent},
  {path:"stocks",component:StocksComponent},





  {path:"promotions",component:PromotionsComponent},
  {path:"addPromotion",component:AddPromotionsComponent},
  {path:"ProduitsPromotion",component:ProduitsPromotionsComponent},
  {path:"AddPromotionproduit",component:AddPromotionProduitsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
