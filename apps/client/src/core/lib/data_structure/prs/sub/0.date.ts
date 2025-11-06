import { OrNone } from '@/common/types/etc';

export class LibPrsDate {
  private static readonly days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  private static readonly months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public static timestampAsMillis(arg: OrNone<number>): number {
    const trillion: number = 1e12;
    const varMs: number = 1000;
    const ts: number = arg && arg < trillion ? arg * varMs : (arg as number);
    return ts;
  }

  public static prettyDate(timestamp?: number): string {
    const date: Date = new Date(this.timestampAsMillis(timestamp ?? Date.now()));

    const dayName: string = this.days[date.getDay()];
    const monthName: string = this.months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  }
}
