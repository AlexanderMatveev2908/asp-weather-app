import { AadCbcHmacT, TokenT } from '@/features/cbcHmac/etc/types';
import { LibBinary } from '../../../core/lib/data_structure/binary';
import { Nullable } from '@/common/types/etc';
import { Reg } from '@/core/paperwork/reg';

export class LibCbcHmac {
  public static aadFrom(token: string): Nullable<AadCbcHmacT> {
    const maxParts: number = 4;
    const parts: string[] = token.split('.', maxParts);

    try {
      const binaryAad: Uint8Array = LibBinary.binaryFromHex(parts[0]);
      const json: string = LibBinary.utf8FromBinary(binaryAad);
      const map: AadCbcHmacT = JSON.parse(json);

      return map;
    } catch {
      return null;
    }
  }

  public static getType(token: Nullable<string>): Nullable<TokenT> {
    if (!token || !Reg.isCbcHmac(token)) return null;

    const aad: Nullable<AadCbcHmacT> = this.aadFrom(token);
    return aad?.tokenT ?? null;
  }

  public static isOfType(token: Nullable<string>, expected: TokenT): boolean {
    const t: Nullable<TokenT> = this.getType(token);

    return t === expected;
  }
}
