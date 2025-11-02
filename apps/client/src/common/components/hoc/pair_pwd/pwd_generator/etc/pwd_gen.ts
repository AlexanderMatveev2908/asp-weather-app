import { Ascii } from './asci';
import { Rand } from './rand';

export class PwdGen extends Rand {
  public static pwdOf(charForRange: number): string {
    let pwd: string = '';

    for (const r of Ascii.ascii()) {
      let j: number = 0;

      while (j < charForRange) {
        const idx: number = this.idxIn(r.length);
        pwd += r[idx];

        j++;
      }
    }

    return this.shuffle(pwd);
  }
}
