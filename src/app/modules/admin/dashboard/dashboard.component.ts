import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  orders:any[] = [];
  statuses:any = ['pending', 'processing', 'paid', 'cancelled'];

  constructor(public userService:UserService, public adminService:AdminService){}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.adminService.getAllOrders().subscribe((res:any)=>{
      console.log(res);
      this.orders = res;
    },(err)=>{
      console.log(err);
    });
  }

  updateOrderStatus(orderId:any, status:any){
    this.adminService.updateOrderStatus(orderId, {status: status}).subscribe((res:any)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    });
  }
  
}
