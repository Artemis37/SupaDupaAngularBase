export class DateTimeHelpers {
  static formatDate(date: Date | string | null | undefined): string {
    if (!date) {
      return '';
    }
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString();
  }

  static formatTime(date: Date | string | null | undefined): string {
    if (!date) {
      return '';
    }
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString();
  }

  static formatDateTime(date: Date | string | null | undefined): string {
    if (!date) {
      return '';
    }
    const d = typeof date === 'string' ? new Date(date) : date;
    return `${this.formatDate(d)} ${this.formatTime(d)}`;
  }
}
