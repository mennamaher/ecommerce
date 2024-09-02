import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errMsg : string ='';
  isLoading: boolean = false;

  loginForm :FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)]),

  })

  constructor(private _AuthService:AuthService, private _Router:Router) {

  }


  loginClick() {
    this.isLoading=true;

    this._AuthService.sendLogin(this.loginForm.value).subscribe({
      next : (res)=>{
        this.isLoading=false;

        localStorage.setItem('userToken',res.token)
        this,this._AuthService.userInf()
        this._Router.navigate(['home'])
      },
      error : (err)=>{
        this.errMsg = err.error.message
        this.isLoading=false;
      }
    })

  }

}
