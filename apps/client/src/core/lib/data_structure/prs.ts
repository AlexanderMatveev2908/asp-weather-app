import { OrNone } from '@/common/types/etc';
import { UserT } from '@/features/user/etc/types';

export class LibPrs {
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

  public static strToBool(arg: string): boolean {
    const map = {
      true: true,
      false: false,
    };

    return map[arg as keyof typeof map];
  }

  public static minutesToMs(minutes: number): number {
    // eslint-disable-next-line no-magic-numbers
    return minutes * 60 * 1000;
  }

  public static txtOfCamelCase(arg: string, { titleCase }: { titleCase: boolean }): string {
    const splitted: string[] = arg.replace(/([A-Z])/g, ' $1').split(' ');
    const formatted: string[] = splitted.map((str: string) =>
      titleCase
        ? (str.at(0) ?? 'bug_split_word').toUpperCase() + str.slice(1).toLowerCase()
        : str.toLowerCase()
    );

    return formatted.join(' ');
  }

  public static toSnake(arg: string): string {
    const replaced: string = arg
      .replace(/\s+/g, '')
      .replace(/\//g, '_')
      .replace(/(?<!^)([A-Z])/g, '_$1')
      .replace(/_{3,}/g, '__');

    return replaced.toLowerCase();
  }

  public static snakeToTxt(arg: string): string {
    return this.titleCase(arg.toLowerCase().split('_').join(' '));
  }

  private static firstUpper(arg: string): string {
    return arg.at(0)!.toUpperCase();
  }

  public static titleCase(arg: string): string {
    return arg
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map((w: string) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
      .join(' ');
  }

  public static initials(user: UserT): string {
    return `${this.firstUpper(user.firstName)}${this.firstUpper(user.lastName)}`;
  }

  public static prettyPrintCols(vals: OrNone<string[]>): string {
    let str: string = '';

    if (!vals) return str;

    const maxValsForRow: number = 3;
    for (let i = 0; i < vals.length; i++) {
      // eslint-disable-next-line no-magic-numbers
      str += i % maxValsForRow === 0 ? `\n` : ' '.repeat(3);
      str += vals[i];
    }

    return str.trim();
  }
}
