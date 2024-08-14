import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private apiUrl4 = "http://localhost:8082/api/pack";
  private apiUrl5 = "http://localhost:8082/api/voucher";
  private apiUrl6 = "http://localhost:8082/api/commande";


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

  addProduits(formData: FormData): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/addProduits`, formData, { headers });
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

  addPack(formData: FormData): Observable<any> {

    return this.http.post(`${this.apiUrl4}/addPacks`, formData,);
  }



  listPacks(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl4}/listPacks`);
  }



  GetOnePack(packId:number): Observable<any[]>{
 
    const url =`${this.apiUrl4}/packs/${packId}`;

    return this.http.get<any>(url)


  }

  
  DeletePack(packId:number): Observable<any> {
 
    const url = `${this.apiUrl4}/deletePack/${packId}`;

    return this.http.delete(url);

  }
  AffectProductToPack(packId:number, productId:number): Observable<any[]>{
 
    const url =`${this.apiUrl4}/AffectProduct/${packId}/${productId}`;

    return this.http.get<any>(url)


  }

// employee.service.ts
applyIndividualDiscounts(packId: number, productDiscounts: { [productId: number]: number }, prixCondition: string): Observable<any> {
  const url = `${this.apiUrl4}/${packId}/apply-individual-discounts`;
  const params = new HttpParams().set('prixCondition', prixCondition);
  return this.http.post(url, productDiscounts, { params });
}

  addVoucher(vouchers: any, quantity:number): Observable<any> {
    let params = new HttpParams()
    .set('quantity', quantity);

    return this.http.post(`${this.apiUrl5}/create`, vouchers,{params});
  }


  listVoucher(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl5}/vouchers`);
  }


  DeleteVoucher(voucherId:number): Observable<any> {
 
    const url = `${this.apiUrl5}/${voucherId}`;

    return this.http.delete(url);

  }
  applyVoucherToUser(params: HttpParams) {
    return this.http.post(`${this.apiUrl5}/applyUser`, null, {
      params: params,
      responseType: 'text' as 'json' // Specify response type as 'text'
    });
  }
  sendVoucherToAllClients(voucherId: number): Observable<string> {
    const params = new HttpParams().set('voucherId', voucherId.toString());
    return this.http.post<string>(`${this.apiUrl5}/sendToAllClients`, null, { params });
  }

  applyVoucherToProduct(voucherCode: string, productId: number): Observable<string> {
    
    const params = new HttpParams()
      .set('VoucherCode', voucherCode.toString())
      .set('productId', productId);

    return this.http.post<string>(`${this.apiUrl5}/apply`, params, { responseType: 'text' as 'json' });
  }


  getOneVoucher(id:number): Observable<any[]>{
    
    const url =`${this.apiUrl5}/IDVoucher/${id}`;

    return this.http.get<any>(url)


  }

  getUsers():Observable<any[]>{

    const url =`${this.apiUrl5}/users`;

    return this.http.get<any>(url)
  }


  ListCommandes(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl6}/listCommandes`);
  }

  ListShipping(): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl6}/listShipping`);
  }

  createShipping(commandeId: number, trackingNumber: string, shippingCompany: string): Observable<any> {
    const params = new HttpParams()
      .set('commandeId', commandeId.toString())
      .set('trackingNumber', trackingNumber)
      .set('shippingCompany', shippingCompany);

    return this.http.post<any>(`${this.apiUrl6}/Shipping`, params);
  }

}
