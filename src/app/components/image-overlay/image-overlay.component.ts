import { Component, OnInit } from '@angular/core';
import { ImageOverlayService } from './image-overlay.service';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.css']
})
export class ImageOverlayComponent implements OnInit {

  constructor(public imgOverlayService: ImageOverlayService) { }

  ngOnInit() {
  }



}
