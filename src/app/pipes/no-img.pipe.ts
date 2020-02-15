import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'noImg'
})
export class NoImgPipe implements PipeTransform {

  transform(value: string): string {
    return value ? `http://localhost:5000${value}` : './assets/images/users/rol.jpg';
  }

}
