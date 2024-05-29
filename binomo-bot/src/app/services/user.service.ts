import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TelegramService } from './telegram.service';
import {User} from "../data/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private telegramService: TelegramService) {}

  getUser(): Observable<User> {
    const user = this.telegramService.tg.initDataUnsafe?.user;

    return of(user);
  }
}
