import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/config/environment';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit{
  apiUrl = environment.apiUrl
  form!:FormGroup;
  productId:any;
  productDetails:any;
  img!:File;
  categories:any[] = [];
  @ViewChild('imgInput ', { static: false }) imgInput !: ElementRef;

  constructor(public userService:UserService, public adminService:AdminService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails();
    this.getCategories();

    this.form = new FormGroup({
      category_id: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      description: new FormControl(''),
      img: new FormControl(null),
      stock: new FormControl('')
    });
  }

  onImageFileUpload(event: any) {
    this.img = event.target.files[0]; // DOCU: Get the first file from the FileList
    this.form.patchValue({
      img: this.img
    });
  }

  getProductDetails(){
    this.userService.getProductById(this.productId).subscribe((res:any)=>{
      console.log(res);
      this.productDetails = res;
    },(err)=>{
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

  onSubmit(){
    const formData = new FormData();
 
        // DOCU: The API endpoint accepts multipart/formdata so FormData is needed since we are to upload files.
        formData.append('category_id', this.form.get('category_id')?.value);
        formData.append('name', this.form.get('name')?.value);
        formData.append('price', this.form.get('price')?.value);
        formData.append('description', this.form.get('description')?.value);
        formData.append('stock', this.form.get('stock')?.value);
        
        const mainImgFile = this.form.get('img')?.value;
        formData.append('img', mainImgFile);
        console.log(formData)
        this.updateProduct(formData);
  }

  updateProduct(formData:any){
    console.log(formData)
    this.adminService.updateProduct(this.productId, formData).subscribe((res:any)=>{
      console.log(res);
      this.form.patchValue({
        img: ([null])
      });

      this.imgInput.nativeElement.value = "";
      this.getProductDetails();
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
}
