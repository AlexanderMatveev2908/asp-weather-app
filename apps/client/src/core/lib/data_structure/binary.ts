import { Nullable } from '@/common/types/etc';
import { ErrApp } from '../err';

export class LibBinary {
  private static readonly BASE_32_ALPH: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  public static binaryFromHex(arg: string): Uint8Array {
    const pairs: Nullable<RegExpMatchArray> = arg.match(/.{1,2}/g);
    if (!pairs) return new Uint8Array();

    return new Uint8Array(pairs.map((chars: string) => parseInt(chars, 16)));
  }

  public static utf8FromBinary(binary: Uint8Array): string {
    return new TextDecoder('utf-8').decode(binary);
  }

  public static binaryFromB32(b32: string): Uint8Array {
    const cleaned: string = b32.replace(/=+$/g, '').toUpperCase();
    let bits = '';

    const RADIX: number = 2;
    const BITS_IN_BYTE: number = 8;
    const BITS_FOR_CHAR: number = 5;

    for (const char of cleaned) {
      const idx: number = this.BASE_32_ALPH.indexOf(char);

      if (idx === -1) throw new ErrApp('invalid b32 str');

      bits += idx.toString(RADIX).padStart(BITS_FOR_CHAR, '0');
    }

    const bytes: number[] = [];
    for (let i = 0; i + BITS_IN_BYTE <= bits.length; i += BITS_IN_BYTE) {
      const chunk: string = bits.slice(i, i + BITS_IN_BYTE);
      const decimal: number = parseInt(chunk, RADIX);
      bytes.push(decimal);
    }

    return new Uint8Array(bytes);
  }

  public static hexFromBinary(binary: Uint8Array): string {
    const RADIX: number = 16;
    const CHARS_FOR_BYTE: number = 2;

    return Array.from(binary)
      .map((byte: number) => byte.toString(RADIX).padStart(CHARS_FOR_BYTE, '0'))
      .join('');
  }

  public static hexFromB32(b32: string): string {
    return this.hexFromBinary(this.binaryFromB32(b32));
  }
}
