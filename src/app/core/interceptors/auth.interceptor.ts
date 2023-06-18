import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // DOCU: Get the JWT token from local storage.
    const token = localStorage.getItem('token');

    // DOCU: Clone the request and modify it to add the Authorization header.
    if(token){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`,
          
        }
      });
    }

    // DOCU: Pass the request to the next interceptor or if none then to the HttpClient.
    return next.handle(request);
  }
}
