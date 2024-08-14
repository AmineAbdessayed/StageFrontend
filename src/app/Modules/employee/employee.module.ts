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
import { AddPackComponent } from './Components/add-pack/add-pack.component';
import { PacksComponent } from './Components/packs/packs.component';
import { PacksDetailsComponent } from './Components/packs-details/packs-details.component';
import { VouchersComponent } from './Components/vouchers/vouchers.component';
import { AddVoucherComponent } from './Components/add-voucher/add-voucher.component';
import { VoucherDetailsComponent } from './Components/voucher-details/voucher-details.component';
import { CommandsComponent } from './Components/commands/commands.component';
import { CreateShippingComponent } from './Components/create-shipping/create-shipping.component';
import { ShippingListComponent } from './Components/shipping-list/shipping-list.component';

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
    AddPackComponent,
    PacksComponent,
    PacksDetailsComponent,
    VouchersComponent,
    AddVoucherComponent,
    VoucherDetailsComponent,
    CommandsComponent,
    CreateShippingComponent,
    ShippingListComponent,

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
