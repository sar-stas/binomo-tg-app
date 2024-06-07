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
      window.location.href = 'https://binomo.com/auth?a=fa974b326c30&i=#SignUp';
      this.localStorageService.set(IS_ONBOARDING_PASSED, 'true');
      this.googleAnalyticsService.finish();
    }
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + 3) % 3; // Обеспечивает цикличность карусели
  }
}
