import { Rand } from '@/common/components/hoc/pair_pwd/pwd_generator/etc/rand';

export class LibDate {
  private static padDate(arg: number): string {
    // eslint-disable-next-line no-magic-numbers
    return (arg + '').padStart(2, '0');
  }

  public static fromTmspToPicker(arg: number): string {
    const d: Date = new Date(arg);

    const dd: string = this.padDate(d.getDate());
    const mm: string = this.padDate(d.getMonth() + 1);
    const yyyy = d.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  public static pickerNow(): string {
    return this.fromTmspToPicker(Date.now());
  }

  public static randomDate(): string {
    const now: number = Date.now();

    const nextYear: Date = new Date(now);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const oneYear: number = nextYear.getTime() - now;

    const someDay: number = now + Rand.randInRange(-oneYear, oneYear);

    return this.fromTmspToPicker(someDay);
  }

  public static fromTmspToPretty(arg: number): string {
    const d: Date = new Date(arg);

    return Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  }
}
