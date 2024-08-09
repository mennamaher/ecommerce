import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errMsg : string ='';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name : new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)] ),
    email : new FormControl(null, [Validators.required, Validators.email]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^(010|012|011)[0-9]{8}$/)]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)]),
    rePassword : new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][0-9]{6}/)]),

  }, this.confirmPass)

  constructor(private _AuthService:AuthService, private _Router:Router) {

  }


  confirmPass(g:any){
    if( g.get('password').value === g.get("rePassword").value)
      return null
    else{
      return {'passMatch': true}
    }
  }

  clickk() {
    this.isLoading=true;

    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next : (res)=>{
        this.isLoading=false;
        this._Router.navigate(['login'])
      },
      error : (err)=>{
        this.errMsg = err.error.message
        this.isLoading=false;
      }
    })

  }

}
