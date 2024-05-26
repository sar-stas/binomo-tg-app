import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";

interface TgButton {
  show(): void;
  hide(): void;

}

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private window: any;
  public tg: any;
  constructor(
    @Inject(DOCUMENT) private  _document,
    private router: Router
  ) {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.router.navigate(['']);
  }

  ready() {
    this.tg.ready();
  }

  expand() {
    this.tg.expand();
  }

}
