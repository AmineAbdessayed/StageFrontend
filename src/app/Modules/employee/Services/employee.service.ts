import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/Auth/Services/Storage/storage.service';



export interface ProductPromotionDTO {
  productId: number;
  productName: string;
  originalPrice: number;
  finalPrice: number;
  promotionNames: string[]; // Added to hold the names of promotions


}


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = "http://localhost:8082/api/employee";
  private apiUrl2 = "http://localhost:8082/api/stocks";
  private apiUrl3 = "http://localhost:8082/api/promotions";
   // Replace with your API URL


  constructor(private http:HttpClient) { }

//Products
  getProducts(): Observable<any[]> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/listProduits`, { headers });
  }

  getStocks(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl2}/stocks`);
  }

  addProduits(produits: any, stockId: number): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/addProduits?stockId=${stockId}`, produits,{ headers });
  }


  
  getOneProduct(productId:number): Observable<any[]>{
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url =`${this.apiUrl}/produits/${productId}`;

    return this.http.get<any>(url,{headers})


  }


  DeleteProduct(productId:number): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/deleteProduit/${productId}`;

    return this.http.delete(url, { headers });

  }


  updateProduct( produiId: number,produits: any): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/updateProduit/${produiId}`, produits, { headers });
  
  }



  getOneStock(stockId:number): Observable<any[]>{
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url =`${this.apiUrl2}/${stockId}`;

    return this.http.get<any>(url,{headers})


  }

  addStock(stocks: any): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl2}/addStock`, stocks,{ headers });
  }


  DeleteStock(stockId:number): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl2}/deleteStock/${stockId}`;

    return this.http.delete(url, { headers });

  }

  getproduitByStockId(stockId:number): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl2}/produit/${stockId}`;

    return this.http.get(url, { headers });

  }


  listPromotions(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl3}/listPromotions`);
  }
  addPromotions(promotions: any): Observable<any> {
 

    return this.http.post(`${this.apiUrl3}/addPromotion`, promotions);
  }



  DeletePromotion(promotionId:number): Observable<any> {
 
    const url = `${this.apiUrl3}/deletePromotions/${promotionId}`;

    return this.http.delete(url);

  }



  
  addPromotion(promotions: any): Observable<any> {
  
    return this.http.post(`${this.apiUrl3}/addPromotion`, promotions);
  }

 

  addProductToPromotion(promotionId: number, productId: number, discountAmount: number, tauxRemise: number): Observable<void> {
    const url = `${this.apiUrl3}/${promotionId}/products/${productId}`;
    return this.http.post<void>(url, null, {
      params: {
        discountAmount: discountAmount,
        tauxRemise: tauxRemise
      }
    });
  }


  getProductsWithPromotions(): Observable<ProductPromotionDTO[]> {
    const url = `${this.apiUrl3}/products/promotions`;
    return this.http.get<ProductPromotionDTO[]>(url);
  }
}
