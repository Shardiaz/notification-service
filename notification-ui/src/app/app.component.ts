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

  public date: Date = new Date();

  constructor(private http: HttpClient) {}

  public reset() {
    this.type = NotificationType.info;
    this.origin = PushOrigin.system;
    this.label = '';
    this.message = '';
    this.date = new Date();
  }

  public send() {
    const body = {
      message: this.message,
      label: this.label,
      type: this.type,
      origin: this.origin,
      date: this.date && this.date.getTime(),
    };

    this.http
      .post(
        'https://notificationserviceapi.azurewebsites.net/api/notification',
        body
      )
      .subscribe();
  }

  public validateType() {
    if (this.origin === PushOrigin.system) {
      if (
        this.type === NotificationType.info ||
        this.type === NotificationType.warning
      ) {
        return;
      }

      this.type = NotificationType.info;
    } else {
      if (this.type !== NotificationType.info) {
        return;
      }

      this.type = NotificationType.positive;
    }
  }
}
