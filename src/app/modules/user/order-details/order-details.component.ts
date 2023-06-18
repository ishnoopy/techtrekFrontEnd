import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/config/environment';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{
  apiUrl = environment.apiUrl
  orderId:any;
  orderDetails:any = {};
  constructor(public adminService:AdminService, public userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.adminService.getOrderById(this.orderId).subscribe((res:any)=>{
      this.orderDetails = res;
      this.orderDetails.order_items = JSON.parse(this.orderDetails.order_items);
      console.log(this.orderDetails)
    },(err)=>{
      console.log(err);
    });
  }

  generateReceipt(){
    this.userService.generateReceipt(this.orderId).subscribe((data: Blob)=>{
      console.log(data);
      const downloadUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'receipt.txt';
      link.click();
    },(err)=>{
      console.log(err);
    });
  }
}
