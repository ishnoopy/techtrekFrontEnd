import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  orders:any[] = [];

  constructor(public userService:UserService, public adminService:AdminService){}

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(){
    this.userService.getUserOrders(localStorage.getItem('user_id')).subscribe((res:any)=>{
      console.log(res);
      this.orders = res;
    })
  }
}
