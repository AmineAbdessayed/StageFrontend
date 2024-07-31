import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produits-details',
  templateUrl: './produits-details.component.html',
  styleUrls: ['./produits-details.component.scss']
})
export class ProduitsDetailsComponent {

  productId!:number;
  productDetail:any;
  updateForm:FormGroup
  voucherForm:FormGroup
  showUpdateForm=false
  stocks: any[]=[]


  constructor(private router:Router,
              private employeeService:EmployeeService, 
              private activatedRoute : ActivatedRoute,
              private formBuilder :FormBuilder){


   this.updateForm= this.formBuilder.group({

     libelle: ['',],
     description: ['',],
     prixHt: ['',],
     prixHc: ['',],
     tauxTva: ['',],
     stockId: ['',] 

   })

   this.voucherForm = this.formBuilder.group({
    code: ['', Validators.required]
  });

  }





  ngOnInit(): void {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getOneProduct();
    this.fetchStock()

  }


  applyVoucherToProduct(productId: number) {
    const DataCode= this.voucherForm.get('code')?.value;
    
    console.log("--------------", productId)
    console.log("--------------", DataCode)
    this.employeeService.applyVoucherToProduct(DataCode, productId).subscribe(response => {
      console.log('Response from backend:', response);
     
        window.location.reload(); 
    
    }, error => {
      console.error('Error:', error);
      alert("An error occurred while applying the voucher to the product.");
    });
  }

   fetchStock(){
     this.employeeService.getStocks().subscribe((data)=> {
       this.stocks=data;
       console.log(data)
     })
   }
  

  getOneProduct(){

    this.employeeService.getOneProduct(this.productId).subscribe((data)=>{

      this.productDetail=data
    })

  
  }
  
  DeleteProduct(produitId :number):void {
      
    this.employeeService.DeleteProduct(produitId).subscribe((response)=>{
      console.log("deleted succefully", response)
      this.router.navigateByUrl("/employee/produits")
    } , 
  (error)=>
  console.error("error", error))
    }

    UpdateProduit() {
        if (this.updateForm.valid) {
          const productUpdatedData = {
            libelle: this.updateForm.get('libelle')?.value,
            description: this.updateForm.get('description')?.value,
            prixHt: this.updateForm.get('prixHt')?.value,
            prixHc: this.updateForm.get('prixHc')?.value,
            tauxTva: this.updateForm.get('tauxTva')?.value,
            stock : {
              id: this.updateForm.get('stockId')?.value
            }    
          };  
        this.employeeService.updateProduct(this.productId, productUpdatedData).subscribe(
          (response) => {
            console.log("updated successfully", response);
            // Reload current route after update
            this.router.navigateByUrl('/employee/produits')
            ;
          },
          (error) => {
            console.error("error updating", error);
          }
        );
  
      }
    }

  EtatUpdateForm(){

    this.showUpdateForm=this.showUpdateForm? false: true
     }






}
