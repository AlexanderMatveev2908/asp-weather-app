import { OrNone } from '@/common/types/etc';
import { LibShape } from '@/core/lib/data_structure/shape';

export type EuropeAqiValT = '1' | '2' | '3' | '4' | '5';

export type AirQualityT = 'Good' | 'Fair' | 'Moderate' | 'Poor' | 'Very Poor';

export interface MetaAqiT {
  quality: AirQualityT;
  twdCss: string;
  comment: string;
  val: EuropeAqiValT;
}

export interface PayloadFooterBlockC {
  val: number;
  meta: MetaAqiT;
}

// ? comments AI generated cause API Weather provide only
// ? extremely scientific values about co2 etc...
// ? beside that aqi provided by api weather follow europe standards
// ? not US

export class FooterWeatherUiFktBlockC {
  private static readonly map: Map<EuropeAqiValT, MetaAqiT> = new Map<EuropeAqiValT, MetaAqiT>([
    [
      '1',
      {
        twdCss: 'bg-green__prm',
        quality: 'Good',
        comment: 'Air quality is satisfactory for most people.',
        val: '1',
      },
    ],
    [
      '2',
      {
        twdCss: 'bg-blue-600',
        quality: 'Fair',
        comment: 'Air quality is acceptable; only very sensitive people may notice minor effects.',
        val: '2',
      },
    ],
    [
      '3',
      {
        twdCss: 'bg-yellow-600',
        quality: 'Moderate',
        comment:
          'Air quality is moderate — people with breathing issues should limit prolonged outdoor activity.',
        val: '3',
      },
    ],
    [
      '4',
      {
        twdCss: 'bg-orange-600',
        quality: 'Poor',
        comment: 'Air quality is poor; sensitive groups may experience noticeable discomfort.',
        val: '4',
      },
    ],
    [
      '5',
      {
        twdCss: 'bg-red-600',
        quality: 'Very Poor',
        comment:
          'Air quality is very poor — everyone may feel health effects; avoid heavy outdoor activity.',
        val: '5',
      },
    ],
  ]);

  public static main(v: OrNone<number>): MetaAqiT {
    const param: EuropeAqiValT = (LibShape.isInt(v) ? v + '' : '1') as EuropeAqiValT;

    return this.map.get(param)!;
  }
}
