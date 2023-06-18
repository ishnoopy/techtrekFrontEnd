import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/config/environment';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  apiUrl = environment.apiUrl;
  form!:FormGroup;
  categories:any[] = [];
  products:any[] = [];
  @ViewChild('imgInput ', { static: false }) imgInput !: ElementRef;
  @ViewChild('createForm ', { static: false }) createForm !: ElementRef;


  constructor(public userService:UserService, public adminService:AdminService, private router:Router){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.form = new FormGroup({
      category_id: new FormControl(''),
      name: new FormControl(''),
      author: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
      img: new FormControl(null),
      stock: new FormControl('')
    });
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
        console.log(res);
        this.categories = res;
      },(err)=>{
        console.log(err);
      });
    }

    navigateToProductDetails(productId:any){
      this.router.navigate(['/admin/products', productId]);
    }

    deleteProduct(productId:any){
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.adminService.deleteProduct(productId).subscribe((res:any)=>{
            console.log(res);
            this.getProducts();
          },(err)=>{
            console.log(err);
          });
          Swal.fire({
            title: 'Deleted!',
            text: 'Product has been deleted.',
            icon: 'success',
            timer: 2000,
            toast:true,
            position:'top-end',
          }
          )
        }})
    }


    onImageFileUpload(event: any) {
      this.form.patchValue({
        img: event.target.files[0]
      });
    }

    onSubmit(){
      const formData = new FormData();
  
      formData.append('category_id', this.form.get('category_id')?.value);
      formData.append('name', this.form.get('name')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('stock', this.form.get('stock')?.value);

      const mainImgFile = this.form.get('img')?.value;
      formData.append('img', mainImgFile);
    
      console.log(formData)
      this.patchProduct(formData);
     
    }


    patchProduct(formData:any){
      console.log(formData)
      this.adminService.createProduct(formData).subscribe((res:any)=>{
        console.log(res);
        this.form.reset();
        this.form.patchValue({
          img: ([null])
        });
  
        this.imgInput.nativeElement.value = "";
        this.getProducts();

        //sweetalert toast success
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product updated successfully',
          toast:true,
          position:'top-end',
        })
      },(err)=>{
        console.log(err);
      });
    }
  

    openForm(){
      Swal.fire({
        html: this.createForm.nativeElement, // DOCU: uses the @ViewChild to get the whole html and place it inside the SweetAlert2 box.
        showConfirmButton: false
      });
    }
}
