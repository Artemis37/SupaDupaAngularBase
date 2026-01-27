import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

export interface Message {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessagingService implements OnDestroy {
  private messageSubject = new Subject<Message>();
  private readonly defaultDuration = 5000;
  private messageSubscription: Subscription;

  constructor(private snackBar: MatSnackBar) {
    // Subscribe to messages and automatically display them via snackbar
    this.messageSubscription = this.messageSubject.subscribe(message => {
      this.displaySnackbar(message);
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  getMessages(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

  private displaySnackbar(message: Message): void {
    const config: MatSnackBarConfig = {
      duration: message.duration ?? this.defaultDuration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar-container']
    };
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      ...config,
      data: message
    });
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
