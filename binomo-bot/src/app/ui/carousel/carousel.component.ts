import {Component, HostListener} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {UserService} from "../../services/user.service";
import {map} from "rxjs";
import {LocalStorageService} from "../../services/storage.service";
import {IS_ONBOARDING_PASSED} from "../../data/constants";
import { GoogleAnalyticsService } from "../../services/google-analytics.service";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  public currentSlide = 0;

  public lang$ = this.userService.userLang$.pipe(map((user) => user));

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private googleAnalyticsService: GoogleAnalyticsService,
  ) {
  }

  nextSlide() {
    if(this.currentSlide !== 2) {
      this.currentSlide += 1;
    } else {
      window.location.href = 'https://wybiz.bemobtrcks.com/go/34abf975-9041-42fd-8070-69f7f84ba4c7';
      this.localStorageService.set(IS_ONBOARDING_PASSED, 'true');
      this.googleAnalyticsService.finish();
    }
  }
}
