import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-req-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './req-order.component.html',
  styleUrl: './req-order.component.scss'
})
export class ReqOrderComponent implements OnInit {


  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage','/reqOrder')
    }

  }


  // navigateToOrder(cartId: string) {
  //   // Ensure that the navigation is run inside Angular's zone
  //   this._NgZone.run(() => {
  //     this.router.navigate(['/currentPage', cartId]);
  //   });
  // }



  userDataForm : FormGroup = new FormGroup({
    details : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required]),
    city : new FormControl('', [Validators.required]),
  })


  constructor(private _OrdersService:OrdersService, private _ActivatedRoute:ActivatedRoute,  private _NgZone:NgZone, private router: Router){}


  checkOut(){
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this._OrdersService.reqOrderAPI( p.get('cartId')! , this.userDataForm.value).subscribe({
        next : (res)=>{
          // console.log(res)
          window.open(res.session.url,"_blank")
        }
      })
    })
  }
}
