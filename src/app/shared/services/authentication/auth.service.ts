import { Login } from './../../interfaces/register';
import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import {Register} from '../../interfaces/register';
import { environment } from '../../../base/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<any> = new BehaviorSubject(null);
  constructor( private _HttpClient:HttpClient, private _Router:Router) {

    afterNextRender(()=>{
      if(localStorage.getItem("userToken")!= null)
        {
          this.userInf();
          this._Router.navigate([localStorage.getItem('currentPage')])
        }
    })

  }


    sendRegister(data : Register):Observable<any>
    {
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
    }

    sendLogin(data : Login):Observable<any>
    {
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
    }

    userInf(){
      this.userData.next(jwtDecode( JSON.stringify(localStorage.getItem("userToken")))) ;
      console.log(this.userData.getValue())

    }

    // ------ forget --------

    sendVefifyAPI(data:any):Observable<any>
    {
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
    }
    sendCodeAPI(data:any):Observable<any>
    {
      return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
    }
    sendNewPassAPI(data:any):Observable<any>
    {
      return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
    }

  }

