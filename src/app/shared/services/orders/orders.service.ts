import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../base/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myHeaders : any = {token: localStorage.getItem("userToken")};

  constructor(private _HttpClient:HttpClient) { }

  reqOrderAPI(cId:string, formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200`,
      {shippingAddress: formData},
      {
        headers : this.myHeaders
      }
    )
  }
}
