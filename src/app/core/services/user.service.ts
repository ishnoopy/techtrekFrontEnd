import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/app/config/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient, private router:Router) { }

  //Product methods
  getProducts(){
    return this.httpClient.get(`${this.apiUrl}api/product/getAllProducts`);
  }

  getProductsByCategory(categoryId:any){
    return this.httpClient.get(`${this.apiUrl}api/product/getProductsByCategory/${categoryId}`);
  }

  getProductById(productId:any){
    return this.httpClient.get(`${this.apiUrl}api/product/getProductById/${productId}`);
  }

  //Category Methods
  getCategories(){
    return this.httpClient.get(`${this.apiUrl}api/category/getCategories`);
  }
  

  //Cart Methods
  addToCart(cartData:any){
    return this.httpClient.post(`${this.apiUrl}api/cart/addCartItem`, cartData);
  }

  getCartItems(userId:any){
    return this.httpClient.get(`${this.apiUrl}api/cart/showCart/${userId}`);
  }

  deleteCartItem(cartId:any){
    return this.httpClient.delete(`${this.apiUrl}api/cart/deleteCartItem/${cartId}`);
  }

  updateCartItem(cartId:any, cartData:any){
    return this.httpClient.put(`${this.apiUrl}api/cart/updateCartItemQty/${cartId}`, cartData);
  }

  checkOut(cartData:any){
    return this.httpClient.post(`${this.apiUrl}api/order/createOrder`, cartData);
  }

  generateReceipt(orderId:any){
    return this.httpClient.get(`${this.apiUrl}api/order/generateReceipt/${orderId}`, { responseType: 'blob' });
  }

  //Order Methods
  getUserOrders(userId:any){
    return this.httpClient.get(`${this.apiUrl}api/order/showUserOrders/${userId}`);
  }

  getOrderById(id:any){
    return this.httpClient.get(`${this.apiUrl}api/order/showOrder/${id}`);
  }
}
