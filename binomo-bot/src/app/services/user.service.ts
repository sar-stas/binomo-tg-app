import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { TelegramService } from './telegram.service';
import {User} from "../data/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private telegramService: TelegramService) {}

  public userLang$: BehaviorSubject<string> = new BehaviorSubject('en');

  getUser(): Observable<User> {
    const user = this.telegramService.tg.initDataUnsafe?.user;
    this.userLang$.next(user?.language_code ?? 'en');
    return of(user);
  }
}
