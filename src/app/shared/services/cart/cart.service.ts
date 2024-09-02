import { environment } from './../../../base/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  userTokenHeader : any = {'token' : localStorage.getItem("userToken")}

  constructor(private _HttpClient:HttpClient) { }

  addToCartAPI(pId : string):Observable<any>{
    return this._HttpClient.post( `${environment.baseUrl}/api/v1/cart`,{productId : pId}, {
      headers : this.userTokenHeader
    })

  }


  updateCartAPI( count : number, pId:string):Observable<any>{
    return this._HttpClient.put( `${environment.baseUrl}/api/v1/cart/${pId}`,{count : count})

  }


  getCartAPI():Observable<any>{
    return this._HttpClient.get( `${environment.baseUrl}/api/v1/cart`)

  }


  removeCartAPI(pId : string):Observable<any>{
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart/${pId}`)

  }


  clearCartAPI():Observable<any>{
    return this._HttpClient.delete( `${environment.baseUrl}/api/v1/cart`)

  }
}
