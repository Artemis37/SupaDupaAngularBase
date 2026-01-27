import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Message {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messageSubject = new Subject<Message>();

  getMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  showSuccess(text: string, duration?: number): void {
    this.messageSubject.next({ type: 'success', text, duration });
  }

  showError(text: string, duration?: number): void {
    this.messageSubject.next({ type: 'error', text, duration });
  }

  showWarning(text: string, duration?: number): void {
    this.messageSubject.next({ type: 'warning', text, duration });
  }

  showInfo(text: string, duration?: number): void {
    this.messageSubject.next({ type: 'info', text, duration });
  }
}
