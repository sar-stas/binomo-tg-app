import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  public event(eventName: string, params: { [key: string]: any }) {
    gtag('event', eventName, params);
  }

  public start() {
    this.event('onboarding_start', {
      'event_category': 'Onboarding',
      'event_label': 'Onboarding Start'
    });
  }

  public finish() {
    this.event('onboarding_finish', {
      'event_category': 'Onboarding',
      'event_label': 'Onboarding Finish'
    });
  }
}
