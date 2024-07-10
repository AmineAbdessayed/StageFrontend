import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-produits-details',
  templateUrl: './produits-details.component.html',
  styleUrls: ['./produits-details.component.scss']
})
export class ProduitsDetailsComponent {

  productId!:number;
  productDetail:any;
  updateForm:FormGroup
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

  }





  ngOnInit(): void {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getOneProduct();
    this.fetchStock()

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
        const productUpdatedData = this.updateForm.value;
  
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
