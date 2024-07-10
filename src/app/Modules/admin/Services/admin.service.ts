import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/Auth/Services/Storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private apiUrl = "http://localhost:8082/api/admin"; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }


  getUserById(userId:number):Observable<any>{
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/getUser/${userId}`;

    return this.http.get<any>(url,{ headers });
  }



  DeleteUser(userId: number): Observable<any> {
    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/deleteUser/${userId}`;

    return this.http.delete(url, { headers });
  }


  addUser(userData: any): Observable<any> {

    const token = StorageService.getToken();
    if (!token) {
      throw new Error('No JWT token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrl}/addUser`; // Adjust URL endpoint as per your API
    return this.http.post<any>(url, userData,{ headers });
  }}
