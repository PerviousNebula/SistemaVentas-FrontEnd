import { NgModule } from '@angular/core';

// Pipes
import { NoImgPipe } from './no-img.pipe';

@NgModule({
  declarations: [
    NoImgPipe
  ],
  exports: [
    NoImgPipe
  ]
})
export class PipesModule { }
