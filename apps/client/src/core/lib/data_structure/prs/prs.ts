import { BoolStrT, OrNone } from '@/common/types/etc';
import { LibPrsDate } from './sub/0.date';

export class LibPrs extends LibPrsDate {
  public static devDate(date: Date | string | number): string {
    {
      const param =
        date instanceof Date ? date : /^\d{10,}n?$/.test(date + '') ? +date : new Date(date);

      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',

        hour12: true,
      }).format(param);
    }
  }

  // public static prettyDate(timestamp?: number): string {
  //   return Intl.DateTimeFormat('en-US', {
  //     weekday: 'long',
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //   }).format(new Date(timestamp ?? Date.now()));
  // }

  public static firstCharUpper(arg: string): string {
    return arg[0].toUpperCase() + arg.slice(1).toLowerCase();
  }

  public static titleCase(arg: string): string {
    return arg
      .split(/\s+/)
      .map((w: string) => this.firstCharUpper(w))
      .join(' ');
  }

  public static txtOfCamelCase(arg: string, { titleCase }: { titleCase: boolean }): string {
    const splitted: string[] = arg.replace(/([A-Z])/g, ' $1').split(' ');
    const formatted: string[] = splitted.map((w: string) =>
      titleCase ? this.firstCharUpper(w) : w.toLowerCase()
    );

    return formatted.join(' ');
  }

  public static toSnake(arg: string): string {
    const replaced: string = arg
      .replace(/\s+/g, '')
      // ! sometimes i pass as argument strange stuff
      .replace(/\//g, '_')
      .replace(/(?<!^)([A-Z])/g, '_$1')
      .replace(/_{3,}/g, '__');

    return replaced.toLowerCase();
  }

  public static strToBool(arg: BoolStrT): boolean {
    const map: Record<BoolStrT, boolean> = {
      true: true,
      false: false,
    };

    return map[arg];
  }

  public static msFromMinutes(minutes: number): number {
    // eslint-disable-next-line no-magic-numbers
    return minutes * 60 * 1000;
  }

  public static roundNone(arg: OrNone<number>): number {
    return Math.round(arg ?? 0);
  }
}
