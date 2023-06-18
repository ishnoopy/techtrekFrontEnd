import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/config/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  apiUrl:any = environment.apiUrl;
  isLoggedIn:any = false;
  userId:any = localStorage.getItem('user_id');
  cartCount:any = 0;
  totalAmount:any = 0;
  items:any[] = [];
  form!:FormGroup;

  constructor(public userService:UserService, public authService:AuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCartItems();
    this.isLoggedIn = this.authService.isloggedIn();
    this.form = new FormGroup({
      user_id: new FormControl(this.userId),
      total_cost: new FormControl(''),
      status: new FormControl(''),
      order_items: new FormControl([]),
    })
  }

  getCartItems(){
    this.userService.getCartItems(this.userId).subscribe((res:any)=>{
      console.log(res);
      this.cartCount = res.length;
      this.items = res;
      this.calculateTotalAmount();
    } ,(err:any)=>{
      console.log(err);
    });
  }

  deleteCartItem(id:any){
    this.userService.deleteCartItem(id).subscribe((res:any)=>{
      console.log(res);
      this.getCartItems();

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product deleted successfully',
        toast:true,
        position:'top-end',
      })
    },(err:any)=>{
      console.log(err);
    });
  }

  updateCartItem(id: any, qty: any) {
    this.userService.updateCartItem(id, { qty: qty }).subscribe(
      (res: any) => {
        console.log(res);
        this.getCartItems();
        this.calculateTotalAmount(); // Calculate the total amount after updating the cart item
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  
  calculateTotalAmount() {
    this.totalAmount = 0; // Reset the total amount
  
    // Calculate the total amount based on each item's price and quantity
    this.items.forEach((item: any) => {
      this.totalAmount += item.price * item.qty;
    });
  }

  checkOut(){
    this.form.patchValue({
      total_cost: this.totalAmount,
      status: "pending",
      order_items: JSON.stringify(this.items),
    })

    console.log(this.form.value);
    this.userService.checkOut(this.form.value).subscribe((res:any)=>{
      console.log(res);
      this.getCartItems();
      this.totalAmount = 0;

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Order placed successfully',
        toast:true,
        position:'top-end',
      })
    });
  }
}
