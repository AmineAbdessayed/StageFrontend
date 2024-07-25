import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stocks-details',
  templateUrl: './stocks-details.component.html',
  styleUrls: ['./stocks-details.component.scss']
})
export class StocksDetailsComponent implements OnInit {
  stock: any;
  stockId!: number;
  produits: any[] = [];
  colors: string[] = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'BLACK', 'WHITE'];
  filteredProduits: any[] = [];
  searchForm: FormGroup;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      color: ['']
    });
  }

  ngOnInit() {
    this.stockId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getStock();
    this.getProduitsByStock(this.stockId);

    // Subscribe to form value changes for real-time search
    this.searchForm.valueChanges.subscribe(() => this.searchProducts());
  }

  getStock() {
    this.employeeService.getOneStock(this.stockId).subscribe(
      (data) => {
        this.stock = data;
        console.log(data);
      }
    );
  }

  DeleteStock(stockId: number) {
    this.employeeService.DeleteStock(stockId).subscribe((response) => {
      console.log(response);
    });
  }

  getProduitsByStock(stockId: number) {
    this.employeeService.getproduitByStockId(stockId).subscribe((data) => {
      this.produits = data;
      console.log(data);
      this.filteredProduits = [...this.produits]; 
    });
  }

  searchProducts() {
    const { name, color } = this.searchForm.value;

    this.filteredProduits = this.produits.filter((product: any) =>
      this.matchesName(product, name) && this.matchesColor(product, color)
    );
  }

  private matchesName(product: any, name: string): boolean {
    if (!name) return true;
    return (product.libelle as string).toLowerCase().includes(name.toLowerCase());
  }

  private matchesColor(product: any, color: string): boolean {
    if (!color) return true;
    return (product.color as string) === color;
  }
}
