import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/app/config/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient, private router:Router) { }

  //Order Methods
  getAllOrders(){
    return this.httpClient.get(`${this.apiUrl}api/order/showOrders`);
  }
  
  getOrderById(id:any){
    return this.httpClient.get(`${this.apiUrl}api/order/showOrder/${id}`);
  }

  updateOrderStatus(id:any, orderData:any){
    return this.httpClient.put(`${this.apiUrl}api/order/updateStatus/${id}`, orderData);
  }

  //Product Methods
  createProduct(productData:any){
    return this.httpClient.post(`${this.apiUrl}api/product/createProduct`, productData);
  }

  deleteProduct(id:any){
    return this.httpClient.delete(`${this.apiUrl}api/product/deleteProduct/${id}`);
  }

  updateProduct(id:any, productData:any){
    return this.httpClient.put(`${this.apiUrl}api/product/updateProduct/${id}`, productData);
  }

}
