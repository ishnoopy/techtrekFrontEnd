import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  userInfo!:any;
  isLoggedIn:any = false;

  @Input() cartCount:any = 0;

  constructor(public authService:AuthService, public userService:UserService ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.isLoggedIn = this.authService.isloggedIn();
    this.getCartItems();
  }

  logout(){
    this.authService.logout();
  }

  getUserInfo(){
    this.authService.getUserInfo(localStorage.getItem('user_id')).subscribe((res:any)=>{
      console.log(res);
      this.userInfo = res;
    },(err)=>{
      console.log(err);
    });
  }

  getCartItems(){
    this.userService.getCartItems(localStorage.getItem('user_id')).subscribe((res:any)=>{
      console.log(res);

      //DOCU: Set cart count
      this.cartCount = res.length;
    } ,(err:any)=>{
      console.log(err);
    });
  }
}
