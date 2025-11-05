import { Nullable } from '@/common/types/etc';
import { LibStack } from './stack';
import { LibShape } from '../data_structure/shape';
import { Reg } from '@/core/paperwork/reg';
import { LibPrs } from '../data_structure/prs/prs';

export class LibLog {
  private static _log(title: Nullable<string>, ...args: unknown[]): void {
    // ? 0 private log
    // ? 1 public log
    // ? 2 real caller
    // eslint-disable-next-line no-magic-numbers
    const caller: string = LibStack.getCallerLess(2);

    const existsTtl: boolean = LibShape.hasText(title);
    const ttl: string = existsTtl ? title! : caller;
    let emoji: string = '';
    if (existsTtl) {
      const firstPart: string = ttl.split(' ')[0];
      if (!Reg.startWithEmoji(firstPart)) emoji = '📌';
    } else {
      emoji = '🧩';
    }

    console.log('\n');
    console.group(
      `${emoji} ${ttl}${existsTtl ? ` • 🧩 ${caller}` : ''}\n⏰ ${LibPrs.devDate(Date.now())}`
    );

    for (const el of args) console.log(el);

    console.groupEnd();
    console.log('\n');
  }

  public static logTtl(title: string, ...args: unknown[]): void {
    this._log(title, ...args);
  }

  public static log(...args: unknown[]): void {
    this._log(null, ...args);
  }

  public static logFormData(form: FormData): void {
    for (const pair of form.entries()) {
      console.log(`🔑 ${pair[0]} => 🖍️ ${pair[1]}`);
    }
  }
}
