import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories:any[] = [];
  products:any[] = [];

  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.userService.getProducts().subscribe((res:any)=>{
      console.log(res);
      this.products = res;
    } ,(err)=>{
      console.log(err);
    });
  }

  getCategories(){
    this.userService.getCategories().subscribe((res:any)=>{
      this.categories = res;
    },(err)=>{
      console.log(err)
    });
  }

  getProductsByCategory(categoryId:any){
    if(categoryId == 0){this.getProducts();  return;}

    this.userService.getProductsByCategory(categoryId).subscribe((res:any)=>{
      this.products = res;
    },(err)=>{
      console.log(err);
    });
  }
}
