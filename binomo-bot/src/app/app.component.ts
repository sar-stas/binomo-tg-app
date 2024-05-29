import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TelegramService} from "./services/telegram.service";
import {TranslateConfigModule} from "./services/translate.service";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./services/user.service";

type SupportedLanguages = 'ms' | 'br' | 'en' | 'es';

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
    this.telegram.ready();
    this.telegram.expand();

    this.userService.getUser().subscribe(user => {
      this.setLanguageBasedOnUser(user.language_code);
    });
  }


  setLanguageBasedOnUser(languageCode: string) {
    if (this.isSupportedLanguage(languageCode)){
      this.translate.setDefaultLang(languageCode);
      this.translate.use(languageCode);
    } else {
      this.translate.use('en');
    }
  }

  isSupportedLanguage(languageCode: string): languageCode is SupportedLanguages {
    return ['ms', 'br', 'en', 'es'].includes(languageCode);
  }
}
