import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { TelegramService } from './telegram.service';
import {User} from "../data/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private telegramService: TelegramService) {}

  public userLang$: BehaviorSubject<string> = new BehaviorSubject('en');

  getUser(): Observable<User> {
    const user = this.telegramService.tg.initDataUnsafe?.user;
    if(['ms', 'pt-br', 'en', 'es'].includes(user?.language_code)) {
      console.log('установка языка - ', user?.language_code);
      this.userLang$.next(user?.language_code ?? 'en');
    }

    return of(user);
  }
}
