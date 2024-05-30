import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TelegramService} from "./services/telegram.service";
import {TranslateConfigModule} from "./services/translate.service";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./services/user.service";
import {AmplitudeService} from "./services/amplitude.service";
import {User} from "./data/user";
import {HttpClient} from "@angular/common/http";
import {SupportedLanguages} from "./data/languages";
import {LocalStorageService} from "./services/storage.service";
import {IS_ONBOARDING_PASSED} from "./data/constants";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateConfigModule
  ],
  providers: [
    HttpClient,
    AmplitudeService
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  telegram = inject(TelegramService);

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private amplitudeService: AmplitudeService,
    private localStorageService: LocalStorageService,
  ) {
    this.userService.getUser().subscribe(user => {
      console.log(user);
      user?.language_code
        ? this.setLanguageBasedOnUser(user.language_code)
        : this.setLanguageBasedOnUser('en');

      this.sendAmplitudeEvent('start', user);
    });

    const isOnboardingPassed = this.localStorageService.get(IS_ONBOARDING_PASSED);
    if(isOnboardingPassed) {
      window.location.href = 'https://binomo.com/auth?a=fa974b326c30&i=#SignUp';
    }

    this.telegram.ready();
    this.telegram.expand();
  }


  setLanguageBasedOnUser(languageCode: string) {
    if (this.isSupportedLanguage(languageCode)){
      console.log("Смена языка!")
      this.translate.setDefaultLang(languageCode);
      this.translate.use(languageCode);
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  }

  isSupportedLanguage(languageCode: string): languageCode is SupportedLanguages {
    return ['ms', 'pt-br', 'en', 'es'].includes(languageCode);
  }

  sendAmplitudeEvent(event: string, user: User) {
    const userId = user?.id.toString(); // Замените на реальный идентификатор пользователя
    if (userId)  {
      this.amplitudeService.sendEvent(userId, event).subscribe(
        response => {
        },
        error => {
          console.error('Error sending event:', error);
        });
    }
  }
}
