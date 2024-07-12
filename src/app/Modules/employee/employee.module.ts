import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { ProduitsComponent } from './Components/produits/produits.component';
import { AddProduitComponent } from './Components/add-produit/add-produit.component';
import { StocksComponent } from './Components/stocks/stocks.component';
import { AddStockComponent } from './Components/add-stock/add-stock.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitsDetailsComponent } from './Components/produits-details/produits-details.component';
import { StocksDetailsComponent } from './Components/stocks-details/stocks-details.component';
import { PromotionsComponent } from './Components/promotions/promotions.component';
import { AddPromotionsComponent } from './Components/add-promotions/add-promotions.component';
import { ProduitsPromotionsComponent } from './Components/produits-promotions/produits-promotions.component';
import { AddPromotionProduitsComponent } from './Components/add-promotion-produits/add-promotion-produits.component';

@NgModule({
  declarations: [
    DashbordComponent,
    ProduitsComponent,
    AddProduitComponent,
    StocksComponent,
    AddStockComponent,
    ProduitsDetailsComponent,
    StocksDetailsComponent,
    PromotionsComponent,
    AddPromotionsComponent,
    ProduitsPromotionsComponent,
    AddPromotionProduitsComponent,

  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatCardModule, // Ensure MatCardModule is imported
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeeModule { }
