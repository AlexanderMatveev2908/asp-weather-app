import { Nullable } from '@/common/types/etc';

// ? 00B0 => °

export class LibPrsWeather {
  // eslint-disable-next-line no-magic-numbers
  private static readonly K_DIFF: number = 273.15;

  public static celsiusFromKelvin(arg: Nullable<number>): string {
    if (!arg) return '0°';

    const rounded: number = Math.round(arg - this.K_DIFF);

    return `${rounded}°`;
  }
}
