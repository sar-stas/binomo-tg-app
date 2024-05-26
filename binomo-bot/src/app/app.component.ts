import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TelegramService} from "./services/telegram.service";
import {TranslateConfigModule} from "./services/translate.service";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateConfigModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  telegram = inject(TelegramService);

  constructor(
    private translate: TranslateService,
    private userService: UserService
  ) {
    this.telegram.ready();
    this.telegram.expand();
  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.setLanguageBasedOnUser(user.language_code);
    });
  }


  setLanguageBasedOnUser(languageCode: string) {
    this.translate.setDefaultLang(languageCode);
    this.translate.use(languageCode);
  }
}
