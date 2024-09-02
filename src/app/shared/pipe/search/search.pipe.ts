import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../../interfaces/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productList : Products[], word : string): Products[] {

    return productList.filter ( (prod)=> prod.title.toLowerCase().includes(word.toLowerCase())
  );
  }

}
