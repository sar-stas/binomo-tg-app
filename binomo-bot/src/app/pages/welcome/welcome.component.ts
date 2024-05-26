import {Component, Input } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {CarouselComponent} from "../../ui/carousel/carousel.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    CarouselComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  @Input() isLoading: boolean | null = true;

  constructor() {
    setTimeout(() =>  {
      this.isLoading = false
    }, 3000)
  }
}
