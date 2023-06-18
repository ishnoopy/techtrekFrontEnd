import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  form!:FormGroup;

  constructor(public userService:UserService, public authService:AuthService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email_address: new FormControl(''),
      password: new FormControl(''),
    });
  }

  createAccount(){
    this.authService.signup(this.form.value).subscribe((res:any)=>{
      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Account created successfully!',
        showConfirmButton: true,
        toast: true,
        position: 'top-right'
      })
      
    }, (err:any)=>{
      console.log(err)
    });
  }

}
