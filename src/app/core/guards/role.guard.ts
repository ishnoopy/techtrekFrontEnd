import { Injectable } from '@angular/core';
import { CanActivateFn, UrlTree } from '@angular/router';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Injectable()
export class RoleGuard implements CanActivate {
  
  constructor(private router: Router, public authService:AuthService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url: string = state.url;

    return this.checkAdminLogin(url);
  }

  
  checkAdminLogin(url: string): Observable<boolean> | boolean {
    if (this.authService.isloggedIn()) {

      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwt_decode.default(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        console.log(role)
        // Use the userRole value for your role-based authorization logic
        if(role == 'admin'){
          return true;
        }else{
          this.router.navigate(['/login'], { queryParams: { returnUrl: url } }).then(() => {
            setTimeout(() => {
              Swal.fire({
                icon: 'error',
                title: 'Not Authorized',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
            }, 100); // Delay the execution of Swal.fire() by 100 milliseconds
          });

          return false;
        }
      }
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: url } }).then(() => {
      setTimeout(() => {
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }, 100); // Delay the execution of Swal.fire() by 100 milliseconds
    });

    return false;
  }
}
