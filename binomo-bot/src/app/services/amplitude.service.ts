import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmplitudeService {
  private apiUrl = 'https://api2.amplitude.com/2/httpapi';
  private apiKey = 'c0fc35db3546a631eff59adae7856367';

  constructor(private http: HttpClient) { }

  sendEvent(userId: string, event: string): Observable<any> {
    const payload = {
      api_key: this.apiKey,
      events: [
        {
          device_id: userId,
          event_type: event
        }
      ]
    };

    return this.http.post(this.apiUrl, payload);
  }
}
