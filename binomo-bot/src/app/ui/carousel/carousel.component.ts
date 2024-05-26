import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  public currentSlide = 0;

  @HostListener('swipeleft', ['$event'])
  onSwipeLeft(event: any) {
    this.nextSlide();
  }

  @HostListener('swiperight', ['$event'])
  onSwipeRight(event: any) {
    this.previousSlide();
  }

  nextSlide() {
    if(this.currentSlide !== 2) {
      this.currentSlide += 1
    } else {
      window.location.href = 'https://binomo.com/auth?a=fa974b326c30&i=#SignUp';
    }
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + 3) % 3; // Обеспечивает цикличность карусели
  }
}
