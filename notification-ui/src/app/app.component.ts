import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum NotificationType {
  positive = 'positive',
  warning = 'warning',
  danger = 'danger',
  info = 'info',
}

export enum PushOrigin {
  system = 'system',
  processing = 'processing',
  evaluation = 'evaluation',
  correspondence = 'correspondence',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public NotificationType = NotificationType;

  public PushOrigin = PushOrigin;

  public type: NotificationType = NotificationType.info;

  public origin: PushOrigin = PushOrigin.system;

  public label: string = '';

  public message: string = '';

  public date: string = new Date().toDateString();

  constructor(private http: HttpClient) {}

  public reset() {
    this.type = NotificationType.info;
    this.origin = PushOrigin.system;
    this.label = '';
    this.message = '';
    this.date = new Date().toDateString();
  }

  public send() {
    const body = {
      message: this.message,
      label: this.label,
      type: this.type,
      origin: this.origin,
      date: new Date(this.date).getTime(),
    };

    this.http.post('https://localhost:5001/api/notification', body).subscribe();
  }
}
