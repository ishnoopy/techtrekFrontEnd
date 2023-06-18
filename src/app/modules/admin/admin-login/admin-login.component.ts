import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit{

  form!:FormGroup;
  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email_address: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login(){
    this.authService.login(this.form.value).subscribe((res:any)=>{
      localStorage.setItem('token', res.token);
      localStorage.setItem('first_name', res.first_name);
      this.router.navigate(['/admin/dashboard']);
    },(err)=>{
      console.log(err);
    });
  }
}
