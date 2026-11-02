export class DateFormatUtil {
  static formatLongDate(value: string): string {
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(value));
  }
}
