import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { subscribe } from 'diagnostics_channel';
import { Products } from '../../../shared/interfaces/products';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from "../../../shared/pipe/search/search.pipe";
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselModule, SearchPipe, FormsModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{


  srch : string = " ";


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  sliderImages:string[]=["../../../../assets/images/main-slider-1.jpeg",
    "../../../../assets/images/main-slider-2.jpeg",
    "../../../../assets/images/main-slider-3.jpeg"
  ]

  allProducts : Products[] = [];

  constructor(private _ProductsService:ProductsService, private _CartService:CartService, private _ToastrService:ToastrService){}

  ngOnInit(): void {
      if(typeof localStorage !== 'undefined'){
        localStorage.setItem('currentPage','/home')
      }

      this._ProductsService.getAllProductsAPI().subscribe({
        next: (res)=>{

          this.allProducts = res.data
        }
      })
  }


  addCart(pId:string){
    this._CartService.addToCartAPI(pId).subscribe((res)=>{
      this._ToastrService.success(res.message)

    })

  }


}


