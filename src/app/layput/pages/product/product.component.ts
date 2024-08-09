import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  ngOnInit(): void {
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage','/product')
    }
}

}
