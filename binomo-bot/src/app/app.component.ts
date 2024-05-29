import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TelegramService} from "./services/telegram.service";
import {TranslateConfigModule} from "./services/translate.service";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./services/user.service";

type SupportedLanguages = 'ms' | 'pt-br' | 'en' | 'es';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateConfigModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  telegram = inject(TelegramService);

  constructor(
    private userService: UserService,
    private translate: TranslateService,
  ) {
    this.userService.getUser().subscribe(user => {
      user?.language_code
        ? this.setLanguageBasedOnUser(user.language_code)
        : this.setLanguageBasedOnUser('en');
    });

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
}
