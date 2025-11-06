import { OrNone } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { LibShape } from '@/core/lib/data_structure/shape';

// ? 00B0 => °

export class LibPrsWeather {
  // eslint-disable-next-line no-magic-numbers
  private static readonly K_DIFF: number = 273.15;

  public static celsiusFromKelvin(arg: OrNone<number>): string {
    if (!arg) return '0°';

    const rounded: number = Math.round(arg - this.K_DIFF);

    return `${rounded}°`;
  }

  public static kmHourFromMetersSec(arg: OrNone<number>): string {
    if (LibShape.isNone(arg)) return '0 km/h';

    const kmHourVar: number = 3.6;
    return `${Math.round(arg! * kmHourVar)} km/h`;
  }

  public static kmVisibilityFromMeters(arg: OrNone<number>): string {
    const varKm: number = 1000;
    return `${LibPrs.roundNone((arg ?? 0) / varKm)} km`;
  }

  public static usAqiFromEuAqi(arg: OrNone<number>): number {
    const valConversionUs: number = 100;
    return (arg ?? 1) * valConversionUs;
  }
}
