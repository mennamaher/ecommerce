import { cart } from './../../../shared/interfaces/cart';
import { Component, NgZone } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  myCart !: cart;
  cartId !: string;

  constructor(private _CartService:CartService,  private _ToastrService:ToastrService, private _NgZone:NgZone, private router: Router){}



  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage','/cart')
    }

    this._CartService.getCartAPI().subscribe((res)=>{

      this.myCart = res;
      this.cartId = res.data._id;
    })
}

updateCount(pId: string, currentCount: number, )
{
  if(currentCount <=0){
    this.remove(pId)

  }
  currentCount = currentCount+1;
  this._CartService.updateCartAPI(currentCount, pId).subscribe((res)=>{
    this._ToastrService.success("cart updated successfully")
    this.myCart = res;

  })

}


remove(pId:string){
  this._CartService.removeCartAPI(pId).subscribe(res=>{
    this._ToastrService.success("item deleted successfully");
    this.myCart = res;

  })
}


}
