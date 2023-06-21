import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/config/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  apiUrl:any = environment.apiUrl;
  isLoggedIn:any = false;
  productId:any = this.route.snapshot.params['id'];
  product:any = {};
  cartCount:any = 0;
  form!:FormGroup;

  constructor(public userService:UserService, public authService:AuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
    this.isLoggedIn = this.authService.isloggedIn;

    this.form = new FormGroup({
      user_id: new FormControl(localStorage.getItem('user_id')),
      product_id: new FormControl(this.productId),
      qty: new FormControl(1),
    });
  }

  getProduct(){
    this.userService.getProductById(this.productId).subscribe((res:any)=>{
      console.log(res);
      this.product = res;
    },(err)=>{
      console.log(err);
    });
  }

  addToCart(){
   if(this.form.value.qty > this.product.stock){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Product out of stock',
      toast:true,
      position:'top-end',
      timer:2000,
      showConfirmButton:false
    })
   }else{
    this.userService.addToCart(this.form.value).subscribe((res:any)=>{
      console.log(res);
      this.getCartItems();
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart successfully',
        toast:true,
        position:'top-end'
      })
    },(err)=>{
      console.log(err);
    });
   }
  }

  getCartItems(){
    this.userService.getCartItems(localStorage.getItem('user_id')).subscribe((res:any)=>{
      console.log(res);
      this.cartCount = res.length;
    } ,(err:any)=>{
      console.log(err);
    });
  }
}
