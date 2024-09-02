import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}


  isCodeForm : boolean = false;
  isNewPassForm : boolean = false;
  isLoading : boolean = false;


  emailForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  codeForm : FormGroup = new FormGroup({
    resetCode : new FormControl(null, [Validators.required])

  })


  resetPassForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)])

  })



  verifyBtn()
  {
    this.isLoading = true;
    this._AuthService.sendVefifyAPI(this.emailForm.value).subscribe({
      next : (res)=>{
        if(res.statusMsg == "success")
        {
          this.isCodeForm = true;
          this.isLoading = false
        }
      } ,
      error : (err)=>{}
    })
  }


  codeBtn(){
    this.isLoading = true;
    this._AuthService.sendCodeAPI(this.codeForm.value).subscribe({
      next : (res)=>{
        if(res.statusMsg == "success")
        {
          this.isCodeForm = false;
          this.isNewPassForm = true;
          this.isLoading = false
        }
      } ,
      error : (err)=>{}
    })

  }

  newPassBtn(){
    this.isLoading = true;
    this._AuthService.sendNewPassAPI(this.resetPassForm.value).subscribe({
      next : (res)=>{

        localStorage.setItem("userToken", res.token)
        this._AuthService.userInf()
        this._Router.navigate(["home"])

          this.isLoading = false
      }
    })

  }
}
