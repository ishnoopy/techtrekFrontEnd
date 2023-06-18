import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
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
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('first_name', res.first_name);
      localStorage.setItem('user_id', res.id);
      this.router.navigate(['/homepage']);
    },(err)=>{
      console.log(err);
    });
  }
}
