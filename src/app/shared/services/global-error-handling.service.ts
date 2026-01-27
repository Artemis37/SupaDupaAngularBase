import { Injectable, ErrorHandler } from '@angular/core';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlingService implements ErrorHandler {
  constructor(private messagingService: MessagingService) {}

  handleError(error: Error | any): void {
    console.error('Global error handler:', error);
    
    let errorMessage = 'An unexpected error occurred';
    
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    this.messagingService.showError(errorMessage);
  }
}
