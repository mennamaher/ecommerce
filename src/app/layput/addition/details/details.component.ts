import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from '../../../shared/interfaces/products';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {


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


  pId: string | null ="";
  myProduct !: Products;

  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService  ){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this.pId= p.get('detail')
      this._ProductsService.getDetailsAPI(this.pId).subscribe({
        next : (res)=>{
          this.myProduct = res.data

        }
      })

    })

  }



}
