import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit{
  userInfo!:any;
  isLoggedIn:any = false;

  constructor(public authService:AuthService, public userService:UserService ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.isLoggedIn = this.authService.isloggedIn();
  }

  getUserInfo(){
    this.authService.getUserInfo(localStorage.getItem('user_id')).subscribe((res:any)=>{
      console.log(res);
      this.userInfo = res;
    },(err)=>{
      console.log(err);
    });
  }

  logout(){
    this.authService.logout();
  }
}
