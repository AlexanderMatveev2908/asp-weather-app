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

  public static prettyDate(timestamp?: number): string {
    const trillion: number = 1e12;
    // eslint-disable-next-line no-magic-numbers
    const ts: number = timestamp && timestamp < trillion ? timestamp * 1000 : (timestamp as number);
    const date: Date = new Date(ts ?? Date.now());

    const dayName: string = this.days[date.getDay()];
    const monthName: string = this.months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  }
}
