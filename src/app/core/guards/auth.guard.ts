import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }


  checkLogin(url: string): Observable<boolean> | boolean {
    if (this.authService.isloggedIn()) {
      return true;
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
