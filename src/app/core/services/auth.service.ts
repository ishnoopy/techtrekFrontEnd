import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/app/config/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient:HttpClient, private router:Router) { }
  
  login(userCredentials:any){
    console.log(userCredentials)
    return this.httpClient.post(`${this.apiUrl}api/auth/login`, userCredentials);
  }

  signup(userCredentials:any){
    console.log(userCredentials);
    return this.httpClient.post(`${this.apiUrl}api/auth/create`, userCredentials);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }

  isTokenExpired(token:string): boolean{
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  isloggedIn(){
    const token = localStorage.getItem('token');
    return token != null && !this.isTokenExpired(token);
  }

  getUserInfo(id:any){
    return this.httpClient.get(`${this.apiUrl}api/auth/getUserById/${id}`);
  }
}
